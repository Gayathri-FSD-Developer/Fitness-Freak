import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import Workout from "../Models/Workout.js";
import Contact from "../Models/Contact.js";
import { createError } from "../error.js";

dotenv.config();

// Register/Create user
export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;

    // Checks for email already exist
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      // createError fun call with 2 params
      return next(createError(409, "Email is already exist"));
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      img,
    });
    const createdUser = await user.save();
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
      expiresIn: "100 years",
    });

    return res.status(200).json({ token, user });
  } catch (error) {
    return next(error);
  }
};

// Login/ Find user
export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); //means i.e {email:email}
    if (!user) {
      return next(createError(404, "User not found"));
    }
    console.log(user, "user");
    // Password checking (compareSync) hash the given p.w. compare both newly hased with stored hased p.w
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    console.log(isPasswordCorrect, "password");
    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect Password. Enter right password"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "100 years",
    });
    return res.status(200).json({ token, user });
  } catch (error) {
    return next(error);
  }
};

// Get User
export const getUserDashboard = async (req, res, next) => {
  try {
    // Checks for the decoded user id comes from middleware
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(401, "User not found"));
    }

    const currentDateFormatted = new Date();
    //  which sets the time to 00:00:00 of the current day, Start of today (midnight)
    const startToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate()
    );
    // Created similarly but with the day incremented by 1, setting the time to 00:00:00 of the following day. Start of tomorrow (midnight)
    const endToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate() + 1
    );

    // Calculate total calries burnt
    const totalCaloriesBurnt = await Workout.aggregate([
      {
        $match: {
          user: user._id,
          date: { $gte: startToday, $lt: endToday }, //  Filters documents to match the user ID and date range.
        },
      },
      {
        $group: {
          _id: null,
          totalCaloriesBurnt: { $sum: "$caloriesBurned" }, // totalCaloriesBurnt is calculated as the sum of caloriesBurned fields
        },
      },
    ]);

    // Calculate total no of workouts
    const totalWorkouts = await Workout.countDocuments({
      user: userId,
      date: { $gte: startToday, $lt: endToday },
    });

    // Calculate average calories burnt per workout
    const avgCaloriesBurntPerWorkout =
      totalCaloriesBurnt.length > 0
        ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts
        : 0;

    // Fetching category of workouts
    const categoryCalories = await Workout.aggregate([
      {
        $match: {
          user: user._id,
          date: { $gte: startToday, $lt: endToday }, // Filters documents to match the user ID and today date range.
        },
      },
      {
        $group: {
          _id: "$category", //Groups the documents by the category field.
          totalCaloriesBurnt: { $sum: "$caloriesBurned" }, //Sums the caloriesBurned field of all the documents in each group
        },
      },
    ]);
    // console.log("CategoryPiechart", categoryCalories);
    // Formating category datas for piechart
    const pieChartData = categoryCalories.map((category, index) => ({
      id: index,
      value: category.totalCaloriesBurnt,
      label: category._id,
    }));

    // Per day calories burnt list for a week (Barchart)
    // To get date of the week (weeks array)
    const weeks = [];
    const caloriesBurnt = [];

    const currentDate = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate); //creates a new Date object that is a copy of currentDate. This ensures we don't modify currentDate directly.
      date.setDate(currentDate.getDate() - i); // .getDate() retrieves the day of the month from the currentDate object (eg: 20 - 6) & .setDate() sets the day of the date (eg: 14 June 2024)
      weeks.push(`${date.getDate()}th`); // push only the date of the month with string (eg:14th)

      const startOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const endOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );

      //   To get the total calories burnt / day for a week (caloriesBurnt array)
      const weekData = await Workout.aggregate([
        {
          $match: {
            user: user._id,
            date: { $gte: startOfDay, $lt: endOfDay },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, //Groups documents by the date formatted as YYYY-MM-DD
            totalCaloriesBurnt: { $sum: "$caloriesBurned" }, // Calculates the sum of the caloriesBurned field for each group.
          },
        },
        {
          $sort: { _id: 1 }, // Sort by date in ascending order
        },
      ]);

      caloriesBurnt.push(
        weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0 //checking for the field exist and push otherwise : 0
      );
    }

    return res.status(200).json({
      totalCaloriesBurnt:
        totalCaloriesBurnt.length > 0
          ? totalCaloriesBurnt[0].totalCaloriesBurnt
          : 0,
      totalWorkouts: totalWorkouts,
      avgCaloriesBurntPerWorkout: avgCaloriesBurntPerWorkout,
      totalWeeksCaloriesBurnt: {
        weeks: weeks,
        caloriesBurned: caloriesBurnt,
      },
      pieChartData: pieChartData,
    });
  } catch (err) {
    next(err);
  }
};

// Get workout by calender date
export const getWorkoutsByDate = async (req, res, next) => {
  try {
    // received user id, date from header / middleware
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) return next(createError(404, "User not found"));

    // set the date if received from req else set the current date
    const date = req.query.date ? new Date(req.query.date) : new Date();
    // This range includes all workouts from the beginning to the end of the selected date(eg:00:00:00 to next day midnit 00:00:00).
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    // filter by the field userId & date range btw selected date
    const todaysWorkouts = await Workout.find({
      user: userId,
      date: { $gte: startOfDay, $lt: endOfDay },
    });
    // Using reduce fun to sum the caloriesBurned field from all workouts retrieved from todaysWorkouts array.
    const totalCaloriesBurnt = await todaysWorkouts.reduce(
      (total, workout) => total + workout.caloriesBurned,
      0
    );

    // console.log(todaysWorkouts,"todays workuts ");
    return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
  } catch (err) {
    next(err);
  }
};

// Add workout card
export const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { workoutString } = req.body;
    // console.log(workoutString,"Workoutstring");
    if (!workoutString) {
      return next(createError(400, "Workout string is missing"));
    }

    // Split workoutString into lines
    const eachworkout = workoutString.split(";").map((line) => line.trim());
    // Check if any workouts start with "#" to indicate categories
    const categories = eachworkout.filter((line) => line.startsWith("#"));
    if (categories.length === 0) {
      return next(createError(400, "No categories found in workout string"));
    }

    const parsedWorkouts = [];
    let currentCategory = "";
    let count = 0;
    // for of Loop through each line to parse workout details
    for (const line of eachworkout) {
      count++;
      if (line.startsWith("#")) {
        const parts = line?.split("\n").map((part) => part.trim());
        // console.log(parts);
        if (parts.length < 5) {
          return next(
            createError(400, `Workout string is missing for ${count}th workout`)
          );
        }

        // Update current category
        currentCategory = parts[0].substring(1).trim();

        // Extract workout details
        const workoutDetails = await parseWorkoutLine(parts);
        console.log(workoutDetails);

        if (workoutDetails == null) {
          return next(createError(400, "Please enter in proper format"));
          // return res.status(400).json({err:"please enter in proper format"})
        }

        // Check if workout already exists
        // const workoutExists = await Workout.findOne({
        //   workoutName: workoutDetails.workoutName,
        // });
        // if (workoutExists) {
        //   return next(
        //     createError(
        //       400,
        //       `Workout "${workoutDetails.workoutName}" already exists`
        //     )
        //   );
        // }

        if (workoutDetails) {
          // Add category to workout details
          workoutDetails.category = currentCategory;
          parsedWorkouts.push(workoutDetails);
        }
      } else {
        return next(
          createError(400, `Workout string is missing for ${count}th workout`)
        );
      }
    }

    // Calculate calories burnt for each workout & Create a new workout input
    for (const workout of parsedWorkouts) {
      workout.caloriesBurned = parseFloat(calculateCaloriesBurnt(workout));
      await Workout.create({ ...workout, user: userId });
    }
    // console.log(parsedWorkouts);
    return res.status(201).json({
      message: "Workouts added successfully",
      workouts: parsedWorkouts,
    });
  } catch (err) {
    next(err);
  }
};

// Function to parse workout details from a line
const parseWorkoutLine = (parts) => {
  const details = {};
  // console.log(parts);
  if (parts.length >= 5) {
    details.workoutName = parts[1].substring(1).trim();
    // console.log(details.workoutName,"WorkoutName");
    details.sets = parseInt(parts[2].split("sets")[0].substring(1).trim());
    details.reps = parseInt(
      parts[2].split("sets")[1].split("reps")[0].substring(1).trim()
    );
    details.weight = parseFloat(parts[3].split("kg")[0].substring(1).trim());
    details.duration = parseFloat(parts[4].split("min")[0].substring(1).trim());
    console.log(details, "details");
    return details;
  }
  return null;
};

// Function to calculate calories burnt for a workout
const calculateCaloriesBurnt = (workoutDetails) => {
  const durationInMinutes = parseInt(workoutDetails.duration);
  const weightInKg = parseInt(workoutDetails.weight);
  const caloriesBurntPerMinute = 5; // Sample value, actual calculation may vary
  return durationInMinutes * caloriesBurntPerMinute * weightInKg;
};

// Contact page
export const contactUs = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    console.log(req.body, "body");
    const userExist = await User.findOne({ email });
    console.log(userExist, "userExist");
    console.log(name, email, message, "name");
    if (!userExist)
      return next(
        createError(
          404,
          `User not found 🔍.
            Please check your email`
        )
      );
    const contact = new Contact({
      name,
      email,
      message,
    });
    const createContact = await contact.save();
    // console.log(createContact,"contact created");
    return res.status(200).json({
      message: "Message sent successfully. Soon we will contact you!",
      data: createContact,
    });
  } catch (err) {
    next(err);
  }
};

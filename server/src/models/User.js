import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import { logError } from "../util/logging.js";
import validateAllowedFields from "../util/validateAllowedFields.js";
const userNameRegex = /^[a-zA-Z][a-zA-Z0-9-_@.]{2,64}$/i;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_@#$%^&*])(?=.{6,64})/;
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: "Required field error! Please add your {PATH} to the form",
      minLength: 1,
      maxLength: [100, "{PATH} should be maximum 100 characters"],
      trim: true,
    },
    lastName: {
      type: String,
      required: "Required field error! Please add your {PATH} to the form",
      minLength: 1,
      maxLength: [100, "{PATH} should be maximum 100 characters"],
      trim: true,
    },
    userName: {
      type: String,
      required: "Required field error! Please add your {PATH} to the form",
      unique: true,
      minLength: [3, "{PATH} should be minimum 3 characters"],
      maxLength: [64, "{PATH} should be maximum 64 characters"],
      trim: true,
      validate: {
        validator: (value) => userNameRegex.test(value),
        message: (props) => `${props.value} is not a valid userName`,
      },
    },
    email: {
      type: String,
      required: "Required field error! Please add your {PATH} to the form",
      minLength: [3, "{PATH} should be minimum 3 characters"],
      maxLength: [250, "{PATH} should be maximum 250 characters"],
      match: [
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "{VALUE} is not a valid email address",
      ],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: "Required field error! Please add your {PATH} to the form",
      minLength: [6, "{PATH} should be minimum 6 characters"],
      maxLength: [64, "{PATH} should be maximum 64 characters"],
      validate: {
        validator: (value) => passwordRegex.test(value),
        message: (props) =>
          `${props.value} is not a valid password. Please follow the pattern.`,
      },
    },
    userType: {
      type: String,
      enum: {
        values: ["Newcomer", "Local"],
        message: (props) => `${props.value} is not a valid userType`,
      },
      required: "Required field error! Please add your {PATH} to the form",
      default: "Newcomer",
    },
    phoneNumber: {
      type: String,
      minLength: [8, "{VALUE} is too short. Enter a valid Mobile phone number"],
      maxLength: [16, "{VALUE} is too long. Enter a valid Mobile phone number"],
      match: [/[+|00][0-9]{7,15}/, "Please fill a valid phone Number"],
    },
    profileImage: String,
    birthDay: {
      type: Date,
      required: "Required field error! Please add your {PATH} to the form",
      validate: {
        validator: (value) => {
          return value < Date.now() - 18 * 365 * 24 * 60 * 60 * 1000;
        },
        message: (newDate) =>
          `${
            newDate.value.getUTCMonth() +
            1 +
            "-" +
            newDate.value.getUTCDate() +
            "-" +
            newDate.value.getUTCFullYear()
          } is not Allowed. you need to be above 18! `,
      },
    },
    joinedAt: { type: Date, default: () => Date.now(), immutable: true },
    interests: [String],
    province: {
      type: String,
      enum: {
        values: [
          "Drenthe",
          "Flevoland",
          "Friesland",
          "Gelderland",
          "Groningen",
          "Limburg",
          "North Brabant",
          "North Holland",
          "Overijssel",
          "South Holland",
          "Utrecht",
          "Zeeland",
        ],
        message: (props) => `${props.value} is not a dutch province`,
      },
    },
    isAdmin: Boolean,
    isActive: Boolean,
    createdActivities: [
      { type: mongoose.SchemaTypes.ObjectId, ref: "Activity" },
    ],
    activities: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Activity" }],
  },
  { timestamps: true },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    logError(error);
    next(error);
  }
});

userSchema.virtual("age").get(function () {
  const currentDate = new Date();
  //const age = Date.now().getUTCFullYear() - this.birthDay.getUTCFullYear();
  return currentDate.getFullYear() - this.birthDay.getUTCFullYear();
});
userSchema.methods.isCorrectPassword = async function (password) {
  try {
    // Compare password
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    logError(error);
  }
  // Return false if error
  return false;
};

const User = mongoose.model("user", userSchema);
//Custom validators to check uniqueness of email & userName
userSchema.path("email").validate(async function (value) {
  const emailCount = await User.count({
    email: value,
  });
  return !emailCount;
}, "Email already exists");
userSchema.path("userName").validate(async function (value) {
  const userNameCount = await User.count({
    userName: value,
  });
  return !userNameCount;
}, "userName already exists");

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    "firstName",
    "lastName",
    "userName",
    "email",
    "phoneNumber",
    "password",
    "userType",
    "birthDay",
    "joinedAt",
    "interests",
    "province",
    "isActive",
    "profileImage",
    "createdActivities",
    "activities",
    "isAdmin",
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  return errorList;
};

export default User;

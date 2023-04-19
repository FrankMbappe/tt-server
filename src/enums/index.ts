const MAX_FILE_SIZE = 1e8;

enum ConfigEntryEnum {
  TwilioAccountSid = "twilioAccountSid",
  TwilioAuthToken = "twilioAuthToken",
  TwilioServiceId = "twilioServiceId",
  JwtPrivateKey = "jwtPrivateKey",
  CloudinaryCloudName = "cloudinaryCloudName",
  CloudinaryApiKey = "cloudinaryApiKey",
  CloudinaryApiSecret = "cloudinaryApiSecret",
}

enum DbModelEnum {
  User = "User",
  Classroom = "Classroom",
  Post = "Post",
  Comment = "Comment",
  Country = "Country",
  File = "File",
  Qa = "Qa",
  Quiz = "Quiz",
  QuizSession = "QuizSession",
  QuizParticipation = "QuizParticipation",
  Tutorial = "Tutorial",
  TutorialStep = "TutorialStep",
  UserProfile = "UserProfile",
}

enum UserTypeEnum {
  Teacher = "teacher",
  Student = "student",
  Consultant = "consultant",
}
enum UserGenderEnum {
  Female = "female",
  Male = "male",
  Other = "other",
}
enum UserHonorificEnum {
  Dr = "Dr",
  Professor = "Professor",
  Mr = "Mr",
  Mrs = "Mrs",
  Ms = "Ms",
}
enum PostTypeEnum {
  Normal = "normal",
  Tutorial = "tutorial",
  Quiz = "quiz",
}
enum EventStatusEnum {
  Pending = "pending",
  Opened = "opened",
  Closed = "closed",
}

export {
  ConfigEntryEnum,
  DbModelEnum,
  UserTypeEnum,
  UserGenderEnum,
  UserHonorificEnum,
  PostTypeEnum,
  EventStatusEnum,
  MAX_FILE_SIZE,
};

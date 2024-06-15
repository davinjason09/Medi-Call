export interface RegisterRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  nik: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  token: string;
}

export interface LoginRequest {
  login: string; // email or phone number
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface UserProfile {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  nik: string;
  profilePicUrl?: string;
}

export interface UpdateProfileRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  nik: string;
}

export interface UpdateProfileResponse {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  nik: string;
  __v: number;
}

export interface UpdateProfilePictureResponse {
  profilePicUrl: string;
}

export interface NearbyServicesRequest {
  latitude: number;
  longitude: number;
  speciality: string;
  harga: string;
  jarak: string;
}

export interface Availability {
  office: string;
  dayOfWeekStart: number;
  dayOfWeekEnd: number;
  startDayTime: number;
  endDayTime: number;
  _id: string;
}

export interface DoctorList {
  _id: string;
  name: string;
  speciality: string;
  pricePerHour: number;
  locLatitude: number;
  locLongitude: number;
  practicingFrom: number;
  profilePic: string;
  appointments: any[];
  availability: Availability;
  geohashLoc: string;
  __v: number;
}

export interface NearbyServicesResponse {
  doctors: DoctorList[];
}

export interface OTPValidationRequest {
  otp: string;
}

export interface OTPValidationResponse {
  message: string;
  token: string;
}

export interface NewOTPResponse {
  message: string;
}

export interface ErrorResponse {
  status: string;
  message: string;
  details?: { message: string; path: string }[];
}
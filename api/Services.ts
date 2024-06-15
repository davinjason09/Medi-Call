import {
  ErrorResponse,
  NearbyServicesRequest,
  NearbyServicesResponse,
  NewOTPResponse,
  OTPValidationRequest,
  OTPValidationResponse,
  UpdateProfilePictureResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UserProfile
} from "@/constants/Interfaces";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_AUTH_URL + "/api",
});

export const registerUser = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await api.post("/auth/register", data);
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
}

export const loginUser = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await api.post("/auth/login", data);
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
}

export const getProfile = async (
  token: string
): Promise<UserProfile> => {
  try {
    const response: AxiosResponse<UserProfile> = await api.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
};

export const updateProfile = async (
  token: string,
  data: UpdateProfileRequest
): Promise<UpdateProfileResponse> => {
  try {
    const response: AxiosResponse<UpdateProfileResponse> = await api.put("/user/profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
};

// export const UpdateProfilePicture = async (token: string, file: File): Promise<UpdateProfilePictureResponse> => {
//   try {
//     const formData = new FormData();
//     formData.append("profilePic", file);

//     const response: AxiosResponse<UpdateProfilePictureResponse> = await api.put("/user/profile/picture", formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return response.data;
//   } catch (error: any) {
//     return handleError(error);

//     throw new Error("Failed to update profile picture.");
//   }
// };

export const UpdateProfilePicture = async (
  token: string,
  base64Uri: string,
  fileName: string
): Promise<UpdateProfilePictureResponse> => {
  try {
    const payload = {
      filename: fileName,
      image: base64Uri,
    };

    const response: AxiosResponse<UpdateProfilePictureResponse> = await api.post("/user/update/picture", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
};

export const getDoctorData = async (
  token: string,
  data: NearbyServicesRequest
): Promise<NearbyServicesResponse> => {
  try {
    const response: AxiosResponse<NearbyServicesResponse> = await api.post(
      "doctor",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
};

export const sendNewOTP = async (
  token: string
): Promise<NewOTPResponse> => {
  try {
    const response: AxiosResponse<NewOTPResponse> = await api.post("/auth/newOTP", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
};

export const validateOTP = async (
  data: OTPValidationRequest,
  token: string
): Promise<OTPValidationResponse> => {
  try {
    const response: AxiosResponse<OTPValidationResponse> = await api.post("/auth/otp", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
};

const handleError = (error: any): never => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const data: ErrorResponse = error.response.data;
      throw new Error(data.details?.[0].message);
    }
    throw new Error(error.message);
  } else {
    throw new Error('An unknown error occurred');
  }
};
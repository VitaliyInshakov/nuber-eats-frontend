/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface CreateAccountDto {
  email: string;
  password: string;
  role: UserRole;
}

export interface EditProfileDto {
  email?: string | null;
  password?: string | null;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RestaurantsDto {
  page?: number | null;
}

export interface VerifyEmailDto {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

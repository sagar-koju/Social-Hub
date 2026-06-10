import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";

export type SignupPayload = {
  username: string;
  email: string;
  password: string;
  displayName: string;
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (payload: SignupPayload) => authService.register(payload),
  });
};
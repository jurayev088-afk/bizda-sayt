"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api/api";
import { App } from "antd";

type PatchProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: File | null;
};

export default function usePatchProfile() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  const { mutate, mutateAsync, isPending } = useMutation({
    mutationKey: ["patch-profile"],

    mutationFn: (data: PatchProfile) => api.patch("auth/profile", data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["profile-me"] });
      message.success("Profil yangilandi!");
    },
    onError: () => {
      message.error("Xatolik yuz berdi!");
    },
  });

  return { mutate, mutateAsync, isPending };
}

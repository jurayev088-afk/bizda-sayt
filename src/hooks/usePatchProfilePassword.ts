"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api/api";
import { App } from "antd";

export type PatchProfilePassword = {
  currentPassword: string,
  newPassword: string
};

export default function usePatchProfilePassword() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  const { mutate, isPending } = useMutation({
    mutationKey: ["patch-profile-password"],

    mutationFn: (data: PatchProfilePassword) => api.patch("/auth/change-password", data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["profile-me"] });
      message.success("Profil parol yangilandi!");
    },
    onError: () => {
       message.error("Parolda xatolik")
      },
  });

  return { mutate, isPending };
}

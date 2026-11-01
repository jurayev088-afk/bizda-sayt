"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api/api";
import { App } from "antd";

export default function useDeleteCartId() {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  const { mutate: CartDeleteId, isPending:CartDeleteIdPending } = useMutation({
    mutationKey: ["delete-cart-id"],

    mutationFn: (id) => api.delete(`/cart/items/${id}`),

    onSuccess: () => {
      message.success("Savatdan 1ta tozalandi!");

      queryClient.invalidateQueries({
        queryKey: ["get-cart"],
      });
    },

    onError: () => {
      message.error("Xatolik yuz berdi!");
    },
  });

  return { CartDeleteId, CartDeleteIdPending };
}
"use client";
import usePatchProfilePassword, {
  PatchProfilePassword,
} from "@/src/hooks/usePatchProfilePassword";
import { Button, Form, Input } from "antd";
import { LockKeyhole, ShieldCheck } from "lucide-react";

export default function ProfileChangePassword() {
  const [form] = Form.useForm();


  const { mutate, isPending } = usePatchProfilePassword();

  const onFinish = (values: PatchProfilePassword) => {
    mutate(values, {
      onSuccess: () => {
        form.resetFields();
      },
    });
  };
  return (
    <div className="rounded-xl border border-gray-100 mt-5 bg-white p-5 shadow-sm sm:p-6">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          name={"currentPassword"}
          label={
            <span className="font-semibold text-gray-700">Eski parol</span>
          }
          rules={[{ required: true, message: "Eski parolni kiriting" }]}
        >
          <Input.Password
            size="large"
            prefix={<LockKeyhole size={17} className="text-gray-400 mr-1" />}
            disabled={isPending}
            placeholder="Eski parol"
            className="rounded-xl!"
          />
        </Form.Item>

        <Form.Item
          name={"newPassword"}
          rules={[
            { required: true, message: "Yangi parolni kiriting" },
            { min: 8, message: "Kamida 8ta belgidan iborat bo'lishi kerak" },
          ]}
          label={
            <span className="font-semibold text-gray-700">Yangi parol</span>
          }
        >
          <Input.Password
            size="large"
            disabled={isPending}
            prefix={<LockKeyhole size={17} className="text-gray-400 mr-1" />}
            placeholder="Yangi parol yarating"
            className="rounded-xl!"
          />
        </Form.Item>

        <div className="mb-6 flex items-start gap-2 rounded-xl bg-[#f5faf7] p-3">
          <ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#399765]" />
          <p className="text-xs leading-5 text-gray-500">
            Xavfsizligingiz uchun kamida 8 ta belgidan iborat, harf va raqamlar
            qatnashgan paroldan foydalaning.
          </p>
        </div>

        <Button
          htmlType="submit"
          loading={isPending}
          disabled={isPending}
          className="!h-11 !rounded-xl !border-0 !bg-[#399765] !px-7 !font-semibold !text-white hover:!bg-[#2e8055]"
        >
          Parolni saqlash
        </Button>
      </Form>
    </div>
  );
}

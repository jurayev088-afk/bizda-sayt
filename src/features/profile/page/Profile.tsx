"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/context/UserContext";

import { FaArrowRight, FaHeart, FaSignOutAlt, FaUser } from "react-icons/fa";

import { Gift, MapPin, PackageCheck, Pencil, WalletCards } from "lucide-react";

import { Button, Input, Upload } from "antd";

import usePatchProfile from "@/src/hooks/usePatchProfile";
import ProfileChangePassword from "../components/ProfileChangePassword";

const menuItems = [
  { href: "/", icon: FaUser, label: "Bosh sahifa" },
  { href: "/wishlist", icon: FaHeart, label: "Sevimlilar" },
  { href: "/cart", icon: PackageCheck, label: "Buyurtmalar" },
];

export default function Profile() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const [showLogout, setShowLogout] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  console.log(avatarPreview);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
  });

  const { mutate, isPending } = usePatchProfile();

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "Foydalanuvchi";

  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() ||
    "U";

const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEdit = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      avatar: user?.avatar || "",
    });

    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      avatar: user?.avatar || "",
    });

    setIsEditing(false);
  };

  const handleSave = () => {
    mutate(
      { ...formData, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          setIsEditing(false);
        },
      },
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("bizdaAccessTokin");
    localStorage.removeItem("bizdaRefreshTokin");

    setUser(null);
    setShowLogout(false);

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#f7f8fc]">
      <div className="mx-auto grid w-full max-w-310 gap-6 px-4 py-8 lg:grid-cols-[250px_1fr]">
        {/* SIDEBAR */}
        <aside className="hidden lg:block">
          <nav className="space-y-1 rounded-lg bg-white p-2 font-medium shadow-sm">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex min-h-12 items-center gap-3 rounded-lg px-4 text-[15px] transition hover:bg-gray-100"
              >
                <item.icon className="text-gray-500" size={18} />
                <span className="text-black">{item.label}</span>
              </Link>
            ))}

            <button
              onClick={() => setShowLogout(true)}
              className="flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-lg px-4 text-left text-[15px] text-red-500 transition hover:bg-red-50"
            >
              <FaSignOutAlt size={17} />
              Chiqish
            </button>
          </nav>
        </aside>

        {/* PROFILE */}
        <section className="min-w-0">
          {/* HEADER */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-950 sm:text-3xl">
                Mening ma&apos;lumotlarim
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Profilingiz va akkauntingizni boshqarish
              </p>
            </div>

            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button size="large" onClick={handleCancel}>
                    Bekor qilish
                  </Button>

                  <Button
                    type="primary"
                    size="large"
                    loading={isPending}
                    onClick={handleSave}
                  >
                    Saqlash
                  </Button>
                </>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  icon={<Pencil size={16} />}
                  onClick={handleEdit}
                >
                  Profilni tahrirlash
                </Button>
              )}
            </div>
          </div>

          {/* USER INFORMATION */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-7 flex items-center gap-5 border-b border-gray-100 pb-6">
              <Upload
                accept="image/*"
                name="avatar"
                showUploadList={false}
                beforeUpload={(file) => {
                  setAvatar(file);

                  const preview = URL.createObjectURL(file);
                  setAvatarPreview(preview);

                  return false;
                }}
              >
                {avatarPreview ? (
                  <Image
                    src={avatarPreview}
                    alt={fullName}
                    width={80}
                    height={80}
                    unoptimized
                    className="h-20 w-20 cursor-pointer rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 cursor-pointer shrink-0 items-center justify-center rounded-full bg-gray-100 text-2xl font-bold text-gray-400">
                    {initials}
                  </div>
                )}
              </Upload>

              <div>
                <h2 className="text-xl font-bold text-gray-950">{fullName}</h2>

                <p className="mt-1 text-sm text-gray-500">Shaxsiy profil</p>
              </div>
            </div>

            <h3 className="mb-5 text-lg font-bold text-gray-900">
              Shaxsiy ma&apos;lumotlar
            </h3>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* FIRST NAME */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Ism
                </label>

                <Input
                  size="large"
                  value={formData.firstName}
                  disabled={!isEditing}
                  placeholder="Ismingiz"
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              </div>

              {/* LAST NAME */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Familiya
                </label>

                <Input
                  size="large"
                  value={formData.lastName}
                  disabled={!isEditing}
                  placeholder="Familiyangiz"
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </div>

              {/* ID */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  ID raqam
                </label>

                <Input size="large" value={user?.id || ""} disabled />
              </div>

              {/* PHONE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Telefon raqam
                </label>

                <Input
                  size="large"
                  value={formData.phone}
                  disabled={!isEditing}
                  placeholder="+998"
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>

              {/* EMAIL */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Elektron pochta
                </label>

                <Input
                  size="large"
                  value={formData.email}
                  disabled={!isEditing}
                  placeholder="example@gmail.com"
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
            </div>
          </div>

          <ProfileChangePassword/>

          {/* CARDS */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* BALANCE */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <WalletCards size={22} className="mb-4 text-[#0879ef]" />

              <p className="text-xs text-gray-400">Balans</p>

              <p className="mt-1 text-xl font-bold text-gray-950">0 so&apos;m</p>

              <Link
                href="#"
                className="mt-5 flex items-center gap-2 text-sm font-medium text-[#0879ef]"
              >
                Hisobni to&apos;ldirish
                <FaArrowRight />
              </Link>
            </div>

            {/* BONUS */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <Gift className="mb-4 text-[#0879ef]" size={22} />

              <p className="text-xs text-gray-400">Mening bonus ballarim</p>

              <p className="mt-1 text-xl font-bold text-gray-950">0</p>
            </div>

            {/* ADDRESS */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
              <MapPin className="mb-4 text-[#0879ef]" size={22} />

              <p className="text-xs text-gray-400">Mening manzillarim</p>

              <p className="mt-1 text-xl font-bold text-gray-950">
                0 ta manzil
              </p>

              <Link
                href="#"
                className="mt-5 flex items-center gap-2 text-sm font-medium text-[#0879ef]"
              >
                Barchasini ko&apos;rish
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* LOGOUT MODAL */}
      {showLogout && (
        <div
          className="fixed inset-0 z-70 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FaSignOutAlt size={20} />
            </div>

            <h3 className="mt-4 text-center text-lg font-bold">
              Hisobdan chiqasizmi?
            </h3>

            <p className="mt-2 text-center text-sm text-gray-500">
              Shaxsiy kabinetingizdan chiqmoqchimisiz?
            </p>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold"
              >
                Bekor qilish
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white"
              >
                Chiqish
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

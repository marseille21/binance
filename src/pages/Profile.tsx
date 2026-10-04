
import {
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import {
  Camera,
  Mail,
  User,
  Wallet,
  Settings,
  CheckCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Profile() {
  const {
    user,
    updateProfileImage,
  } = useAuth();

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  // =====================================
  // NOT LOGGED IN
  // =====================================

  if (!user) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#0b0e11] px-4 text-white">

        <div className="w-full max-w-md rounded-2xl border border-[#2b3139] bg-[#181a20] p-8 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#2b3139]">
            <User
              size={30}
              className="text-gray-400"
            />
          </div>

          <h1 className="mb-2 text-2xl font-bold">
            Login Required
          </h1>

          <p className="mb-6 text-gray-400">
            Please login to view your profile.
          </p>

          <Link
            to="/login"
            className="inline-block rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-500"
          >
            Login
          </Link>

        </div>

      </main>
    );
  }

  // =====================================
  // PROFILE IMAGE
  // =====================================

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert(
        "Image must be smaller than 2MB."
      );
      return;
    }

    setUploading(true);

    const reader = new FileReader();

    reader.onload = () => {
      if (
        typeof reader.result ===
        "string"
      ) {
        updateProfileImage(
          reader.result
        );
      }

      setUploading(false);
    };

    reader.onerror = () => {
      alert(
        "Something went wrong while uploading the image."
      );

      setUploading(false);
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  // =====================================
  // OPEN FILE SELECTOR
  // =====================================

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#0b0e11] px-4 py-8 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* ================================= */}
        {/* PAGE HEADER */}
        {/* ================================= */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            Profile
          </h1>

          <p className="mt-2 text-gray-400">
            Manage your account and profile
            information.
          </p>

        </div>

        {/* ================================= */}
        {/* PROFILE CARD */}
        {/* ================================= */}

        <div className="grid gap-6 lg:grid-cols-3">

          {/* =============================== */}
          {/* PROFILE PHOTO */}
          {/* =============================== */}

          <div className="rounded-2xl border border-[#2b3139] bg-[#181a20] p-6">

            <h2 className="mb-6 text-lg font-semibold">
              Profile Picture
            </h2>

            <div className="flex flex-col items-center">

              {/* IMAGE */}
              <div className="relative">

                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.username}
                    className="h-36 w-36 rounded-full border-4 border-[#2b3139] object-cover"
                  />
                ) : (
                  <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-[#2b3139] bg-yellow-400 text-5xl font-bold text-black">
                    {user.username
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}

                {/* CAMERA BUTTON */}
                <button
                  type="button"
                  onClick={handleChooseImage}
                  className="absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#181a20] bg-yellow-400 text-black transition hover:bg-yellow-500"
                  title="Change profile picture"
                >
                  <Camera size={19} />
                </button>

              </div>

              {/* HIDDEN INPUT */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
                className="hidden"
              />

              {/* USERNAME */}
              <h3 className="mt-5 text-xl font-bold">
                {user.username}
              </h3>

              {/* EMAIL */}
              <p className="mt-1 text-sm text-gray-400">
                {user.email}
              </p>

              {/* BUTTON */}
              <button
                type="button"
                onClick={handleChooseImage}
                disabled={uploading}
                className="mt-6 w-full rounded-lg border border-[#2b3139] px-4 py-3 text-sm font-medium text-gray-200 transition hover:border-yellow-400 hover:text-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploading
                  ? "Uploading..."
                  : user.profileImage
                    ? "Change Picture"
                    : "Upload Picture"}
              </button>

              <p className="mt-3 text-center text-xs text-gray-500">
                JPG, PNG or WEBP
                <br />
                Maximum size: 2MB
              </p>

            </div>

          </div>

          {/* =============================== */}
          {/* ACCOUNT INFORMATION */}
          {/* =============================== */}

          <div className="lg:col-span-2">

            <div className="rounded-2xl border border-[#2b3139] bg-[#181a20]">

              <div className="border-b border-[#2b3139] p-6">

                <h2 className="text-lg font-semibold">
                  Account Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your account details
                </p>

              </div>

              <div className="divide-y divide-[#2b3139]">

                {/* USERNAME */}
                <div className="flex items-center gap-4 p-6">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2b3139]">
                    <User
                      size={19}
                      className="text-gray-300"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Username
                    </p>

                    <p className="mt-1 font-medium">
                      {user.username}
                    </p>
                  </div>

                  <CheckCircle
                    size={18}
                    className="ml-auto text-green-500"
                  />

                </div>

                {/* EMAIL */}
                <div className="flex items-center gap-4 p-6">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2b3139]">
                    <Mail
                      size={19}
                      className="text-gray-300"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Email
                    </p>

                    <p className="mt-1 font-medium">
                      {user.email}
                    </p>
                  </div>

                  <CheckCircle
                    size={18}
                    className="ml-auto text-green-500"
                  />

                </div>

              </div>

            </div>

            {/* ================================= */}
            {/* QUICK LINKS */}
            {/* ================================= */}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              <Link
                to="/wallet"
                className="flex items-center gap-4 rounded-2xl border border-[#2b3139] bg-[#181a20] p-5 transition hover:border-yellow-400"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-400 text-black">
                  <Wallet size={20} />
                </div>

                <div>
                  <p className="font-semibold">
                    Wallet
                  </p>

                  <p className="text-sm text-gray-500">
                    Manage your assets
                  </p>
                </div>

              </Link>

              <Link
                to="/settings"
                className="flex items-center gap-4 rounded-2xl border border-[#2b3139] bg-[#181a20] p-5 transition hover:border-yellow-400"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#2b3139]">
                  <Settings size={20} />
                </div>

                <div>
                  <p className="font-semibold">
                    Settings
                  </p>

                  <p className="text-sm text-gray-500">
                    Manage preferences
                  </p>
                </div>

              </Link>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Profile;


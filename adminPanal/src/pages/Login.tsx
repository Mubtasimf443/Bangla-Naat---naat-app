/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import { Mail, Lock } from "lucide-react";

import React, { FormEvent, useState } from 'react'
import { API_ORIGIN } from "../lib/env";
import { useUserDetailsStore } from "../lib/userData.store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>();
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const setLoginData = useUserDetailsStore(state => state.setLoginData);
  const navigate = useNavigate();
  async function handleFormSubmit(event: FormEvent<HTMLElement>) {
    try {
      event.preventDefault();
      setIsSubmiting(true);
      let response = await fetch(`${API_ORIGIN}/api/auth/admin_login`, {
        method: 'POST',
        headers: {
          'content-type': "application/json"
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
        cache: 'no-cache'
      });

      if (response.status === 200) {
        let { name, email, role } = await response.json();
        setLoginData({ name, email, role });
        toast.success('Login Successful');
        setTimeout(() => {
          navigate('/admin', { replace: true });
        }, 2000);
      }
      else if (response.status === 404) {
        toast.error('User not found. Please check your email.');
      } else if (response.status === 403) {
        toast.error('Access denied. You do not have permission to log in.');
      } else if (response.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.log('error', error );
      toast.error('Network error. Please check your connection.');
    } finally {
      setIsSubmiting(false);
    }
  }
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <section className="relative hidden flex-col justify-between bg-moss-950 p-12 text-white lg:flex">
        <p className="font-display text-3xl font-bold">বাংলা নাত</p>
        <div>
          <h1 className="font-display text-5xl font-bold leading-tight">
            নাতের ভাণ্ডার,
            <br />
            আপনার হাতে
          </h1>
          <p className="mt-5 max-w-sm text-moss-100/80">
            Manage naats, moderators and members of Bangla Naat from one place.
          </p>
        </div>
        <p className="text-sm text-moss-100/60">Bangla Naat admin panel</p>
      </section>

      <section className="flex items-center justify-center px-6 py-12">
        <form className="w-full max-w-sm" onSubmit={handleFormSubmit}>
          <h2 className="font-display text-3xl font-bold">Sign in</h2>
          <p className="mt-2 text-ink-soft">
            Use your admin or moderator account.
          </p>

          <label className="mt-8 block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <div className="relative mt-1.5">
            <Mail
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
            />
            <input
              id="email"
              type="email"
              placeholder="you@banglanaat.com"
              className="w-full rounded-md border border-line bg-white py-2.5 pl-10 pr-3 placeholder:text-ink-soft/60 disabled:opacity-60"
              minLength={6}
              maxLength={254}
              disabled={isSubmiting}
              required
            />
          </div>

          <label className="mt-5 block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <div className="relative mt-1.5">
            <Lock
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
            />
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-md border border-line bg-white py-2.5 pl-10 pr-3 placeholder:text-ink-soft/60 disabled:opacity-70"
              minLength={6}
              maxLength={64}
              disabled={isSubmiting}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-md bg-moss-800 py-2.5 font-semibold text-white hover:bg-moss-900 disabled:opacity-50"
            disabled={isSubmiting}
          >
            Sign in
          </button>
        </form>
      </section>
    </div>
  )
}
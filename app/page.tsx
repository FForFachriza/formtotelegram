"use client";
import axios from "axios";
import { ChangeEvent, useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import textTemplate from "@/app/utils/textTemplate";

export default function Home() {
  const MySwal = withReactContent(Swal);

  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    emailRef.current!.value = e.target.value;
  };

  const subjectHandler = (e: ChangeEvent<HTMLInputElement>) => {
    subjectRef.current!.value = e.target.value;
  };

  const messageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    messageRef.current!.value = e.target.value;
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_TELEGRAM_API_URL + process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
        {
          text: textTemplate(
            emailRef.current!.value,
            new Date().toLocaleString(),
            messageRef.current!.value,
            subjectRef.current!.value
          ),
        }
      );
      MySwal.fire({
        icon: "success",
        title: "Your message has been sent",
        text: "We will reply to you as soon as possible",
      });
      emailRef.current!.value = "";
      subjectRef.current!.value = "";
      messageRef.current!.value = "";
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 ">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 ">
          Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let
          us know.
        </p>
        <section className="space-y-8">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
              Your email
            </label>
            <input
              onChange={emailHandler}
              ref={emailRef}
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="name@gmail.com"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 ">
              Subject
            </label>
            <input
              onChange={subjectHandler}
              ref={subjectRef}
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 ">
              Your message
            </label>
            <textarea
              onChange={messageHandler}
              ref={messageRef}
              id="message"
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Leave a comment..."
              defaultValue={""}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-sky-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
          >
            Send message
          </button>
        </section>
      </div>
    </section>
  );
}

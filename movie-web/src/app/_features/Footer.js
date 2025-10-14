import { EmailIcon } from "../_icons/EmailIcon";
import { MovieIcon } from "../_icons/MovieIcon";
import { PhoneIcon } from "../_icons/PhoneIcon";

export const Footer = () => {
  return (
    <div className="w-full bg-indigo-700 text-white px-9 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-10 justify-between  w-full">
        <div className="flex flex-col  md:items-start gap-3">
          <div className="flex items-center gap-2">
            <MovieIcon className="w-6 h-6" />
            <span className="font-bold text-lg">MovieZ</span>
          </div>
          <p className="text-sm md:text-left">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>
        <div className="flex md:justify-between gap-20">
          <div className="flex flex-col  gap-4 md:items-start">
            <p className="font-semibold text-sm md:text-base">
              Contact Information
            </p>
            <div className="flex items-center gap-2 ">
              <EmailIcon className="w-5 h-5" />
              <div className="flex flex-col">
                <div className="text-sm text-white md:text-base">Email:</div>
                <div className="text-sm md:text-base">support@movieZ.com</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-5 h-5" />
              <div className="flex flex-col">
                <div className="text-sm text-white md:text-base">Phone:</div>
                <div className="text-sm md:text-base">+976 (11) 123-4567</div>
              </div>
            </div>
          </div>
          <div className="flex gap-3  md:items-start flex-col">
            <p className="font-semibold text-sm md:text-base">Follow us</p>
            <div className="flex  md:justify-end gap-4 text-sm md:text-base md:flex-wrap flex-wrap">
              <span className="cursor-pointer">Facebook</span>
              <span className="cursor-pointer">Instagram</span>
              <span className="cursor-pointer">Twitter</span>
              <span className="cursor-pointer">Youtube</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { BellDot, LinkIcon } from "lucide-react";
import { FiDownload } from "react-icons/fi";
import { GoShareAndroid } from "react-icons/go";
import { FaLinkedinIn } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { useVerifyCertificationQuery } from "@/api/verification/verificationApi";
import { useNavigate, useParams } from "react-router-dom";
import CertificatePreview from "../editor/CertificatePreview";
import { useEffect, useRef } from "react";
import FullScreenLoader from "../ui/FullScreenLoader";

export function Verification() {
  const { id } = useParams();
  const navigate = useNavigate();
  const certificateRef = useRef<{ downloadImage: () => Promise<void> }>(null);

  const { data, isLoading, error } = useVerifyCertificationQuery(id ?? "");

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error, navigate]);

  if (isLoading) {
    return (
      <div>
        <FullScreenLoader />
      </div>
    );
  }
  if (error) {
    return <div>Invalid Certification</div>;
  }

  const handleDownload = async () => {
    if (certificateRef.current) {
      await certificateRef.current.downloadImage();
    } else {
      console.log("Certificate preview ref is not available");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#edf6ff]">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4">
        <img
          src="/logo.png"
          alt="AuthentiMATE"
          className="h-10 cursor-pointer"
        />
        <div className="flex items-center gap-3">
          <BellDot className="cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full p-2 w-9 h-9" />
          <img
            src="https://avatar.iran.liara.run/public"
            className="h-9 cursor-pointer"
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-28 bg-[#F2F7FD] rounded-2xl shadow-lg mt-8">
          <img
            src="/design-01jgnhwmqx-1735890821 1.png"
            className="object-cover w-56 h-full"
          />
          <div className="flex items-center gap-10">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">
                Join Our WhatsApp Community & Get Freebies!
              </h3>
              <p className="text-xs">
                Connect with like-minded users, stay updated, and enjoy
                exclusive rewards—just for being part of our community!
              </p>
            </div>
            <div>
              <button className="bg-[#3D0EA9] text-white px-4 py-2 rounded-md w-28">
                Join Now
              </button>
            </div>
          </div>
          <img
            src="/design-01jgnhwmqx-1735890564 1.png"
            className="object-cover w-56 h-full"
          />
        </div>
        <h1 className="text-2xl font-bold text-center my-8">
          You've earned it! Here's your certificate.
        </h1>

        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex justify-center mb-4">
            <CertificatePreview
              design={data?.components}
              ref={certificateRef}
            />
          </div>
          <div className="flex justify-between px-20">
            <div className="flex items-center gap-2">
              <FiDownload
                className="w-8 h-8 border  border-gray-700 rounded p-1.5 cursor-pointer hover:bg-[#3D0EA9] hover:text-white"
                onClick={handleDownload}
              />
              <LinkIcon className="w-8 h-8 border border-gray-700 rounded p-1.5 cursor-pointer hover:bg-[#3D0EA9] hover:text-white" />
              <GoShareAndroid className="w-8 h-8 border border-gray-700 rounded p-1.5 cursor-pointer hover:bg-[#3D0EA9] hover:text-white" />
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-[#3D0EA9] hover:bg-[#3D0EA9]/90 text-white font-semibold rounded shadow-md flex items-center gap-2">
                <FaLinkedinIn className="w-4 h-4" />
                Add to LinkedIn
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-4 py-10">
          <div className="w-full sm:w-1/4 mb-4 sm:mb-0 space-y-3 bg-white p-6 rounded-lg">
            <h2 className="text-xs font-medium text-[#3D0EA9]">ISSUED TO</h2>
            <p className="font-medium">Kadin Lubin</p>
            <button className="px-4 py-2 bg-[#3D0EA9] hover:bg-[#3D0EA9]/90 text-white font-semibold rounded shadow-md flex items-center gap-2 w-full justify-center">
              <FaLinkedinIn className="w-4 h-4" />
              Add to LinkedIn
            </button>
            <div className="flex items-center gap-2">
              <div className="h-9 border border-gray-700 flex items-center gap-2 px-4 rounded w-full justify-center cursor-pointer">
                <FiDownload onClick={handleDownload} />
                Download
              </div>
              <LinkIcon className="w-9 h-9 border border-gray-700 rounded p-2 cursor-pointer shrink-0" />
              <GoShareAndroid className="w-9 h-9 border border-gray-700 rounded p-2 cursor-pointer shrink-0" />
            </div>
            <p className="text-sm font-medium">
              Want to report a mistake?{" "}
              <a href="#" className="text-blue-500">
                Contact Issuer
              </a>
            </p>
          </div>
          <div className="w-full flex flex-col sm:w-3/4 space-y-4">
            <div className="bg-white p-4 rounded-lg space-y-2">
              <h2 className="text-xs font-medium text-[#3D0EA9]">ISSUER</h2>
              <p className="font-medium">Mira Bator</p>
            </div>
            <div className="flex-1 bg-white p-4 rounded-lg space-y-2">
              <h3 className="text-xs font-medium text-[#3D0EA9]">
                DESCRIPTION
              </h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet consectetur. Arcu nunc in tortor
                vitae egestas blandit donec lacinia purus. Sed eget mi
                vestibulum varius sapien nibh ut sit diam. Ipsum risus risus ac
                eget tincidunt pharetra maecenas dui. Neque potenti arcu commodo
                diam velit.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#3D0EA9] text-white py-10 px-6 rounded-t-3xl">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-start space-y-6 sm:space-y-0">
          <div className="">
            <img src="/logo-white.png" alt="AuthentiMATE" className="h-10" />
            <p className="">
              Empowering organizations to manage
              <br /> certifications effortlessly.
            </p>
          </div>

          <div className="">
            <div>
              <h2 className="text-sm font-bold mb-2">Quick Links</h2>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="">
            <h2 className="text-sm font-bold mb-2">Legal Links</h2>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          <div className="">
            <ul className="space-y-2">
              <li>
                <span className="flex items-center">
                  <MdOutlineMailOutline className="w-4 h-4 mr-2" />{" "}
                  support@authentimate.com
                </span>
              </li>
              <li>
                <span className="flex items-center">
                  <IoCall className="w-4 h-4 mr-2" /> 917-888-8888
                </span>
              </li>
              <li className="flex space-x-3">
                <a href="#" className="hover:text-yellow-400">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-yellow-400">
                  <FaFacebookF className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-yellow-400">
                  <FaLinkedinIn className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-400">
          © 2024 AuthentiMATE. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

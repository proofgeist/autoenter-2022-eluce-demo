import { Disclosure } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/outline";
import Logo from "./Logo";
import { useSession } from "../queries/session";
import { signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const [session] = useSession();
  const handleLogout = () => {
    signOut();
  };
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Logo />
                </div>
              </div>
              {session ? (
                <>
                  <UserIcon className="h-6 w-6 rounded-full text-gray-500" />
                </>
              ) : (
                <div className="my-auto">
                  <button
                    className="px-3 py-2 shadow border rounded-md"
                    onClick={() => signIn()}
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

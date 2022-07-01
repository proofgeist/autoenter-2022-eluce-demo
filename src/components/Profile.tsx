import React, { useEffect, useState } from "react";
import { useSession } from "../queries/session";
import { FaCircleNotch } from "react-icons/fa";
import { trpc } from "../utils/trpc";

export default function Profile() {
  const [session] = useSession();
  const [name, setName] = useState(session?.user.name ?? "");
  const [formLoading, setformLoading] = useState(false);
  const { mutateAsync: handleSubmit } = trpc.useMutation(["user.update"]);
  const {
    data: userMe,
    refetch,
    isFetching,
  } = trpc.useQuery(["user.me"], {
    enabled: false,
    retry: false,
    onError: (e) => {
      console.error(e);
      alert(e.message);
    },
  });
  useEffect(() => {
    if (userMe) setName(userMe.name);
  }, [userMe]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <h2 className="font-bold text-2xl">Profile</h2>
      {!session ? (
        <>You must be logged in to see your profile! Please log in</>
      ) : (
        <>
          <div>
            <p>Your Session data (from JWT, updated on login)</p>
            <pre className="bg-gray-200 p-4 shadow-inner rounded">
              {JSON.stringify(session.user, null, 4)}
            </pre>
            <p className="mt-4">
              Your User record (from tRPC Query, to update,{" "}
              {isFetching ? (
                <span className="text-primary inline-flex gap-1 items-center">
                  <FaCircleNotch className="animate-spin" />
                  fetching...
                </span>
              ) : (
                <span
                  onClick={() => refetch()}
                  className="text-primary cursor-pointer"
                >
                  click here
                </span>
              )}
              )
            </p>
            <pre className="bg-gray-200 p-4 shadow-inner rounded">
              {JSON.stringify(userMe, null, 4)}
            </pre>
          </div>
          <div className="mt-4">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setformLoading(true);
                console.log({ name });
                try {
                  await handleSubmit({ name });
                  await refetch();
                } catch (e) {
                  console.error(e);
                } finally {
                  setformLoading(false);
                }
              }}
            >
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex w-full justify-end mt-4">
                <button
                  className="bg-primary hover:bg-teal-700 px-3 py-1.5 rounded text-white shadow inline-flex gap-2 items-center disabled:opacity-70"
                  disabled={formLoading}
                  type="submit"
                >
                  {formLoading && <FaCircleNotch className="animate-spin" />}
                  Update
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

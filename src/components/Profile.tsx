import React from "react";
import { useSession } from "../queries/session";

export default function Profile() {
  const [session] = useSession();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <h2 className="font-bold text-2xl">Profile</h2>
      {!session ? (
        <>You must be logged in to see your profile</>
      ) : (
        <div>
          <p>Your Session data</p>
          <pre className="bg-gray-200 p-4 shadow-inner rounded">
            {JSON.stringify(session.user, null, 4)}
          </pre>
        </div>
      )}
    </div>
  );
}

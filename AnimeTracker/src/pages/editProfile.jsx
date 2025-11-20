import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import { authClient } from "../auth-client.js"
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function EditUserProfile() {
  const [receivedData, setRecievedData] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newFullName, setNewFullName] = useState('')
  const [instagramLink, setInstagramLink] = useState('')
  const [tiktokLink, setTiktokLink] = useState('')
  const [facebookLink, setFacebookLink] = useState('')
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async () => {
  try {
    const updatedData = {};

    if (newFullName !== '') updatedData.name = newFullName;
    if (newUsername !== '') updatedData.username = newUsername;
    if (newEmail !== '') updatedData.email = newEmail;
    if (instagramLink !== '') updatedData.instagramAccountLink = instagramLink;
    if (tiktokLink !== '') updatedData.tiktokAccountLink = tiktokLink;
    if (facebookLink !== '') updatedData.facebookAccountLink = facebookLink;

    await fetch("/UpdateUser", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedData), // <-- send fields directly
    });

    navigate('/MyProfile');
    window.location.reload(true);
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

 

  const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()

  useEffect(() => {
    if (session){
      console.log(`signed in as ${session.user?.username}`)
      const receivedData = location?.state?.data;
      if (receivedData){
        setRecievedData(receivedData)
        setName(receivedData.name ?? 'error')
        setEmail(receivedData.email ?? 'error')
      } else {
        console.log('No receivedData available in location.state')
      }
    }
  }, [session, location])
  return (
    <>
    <Navbar />
<section class="py-40 bg-gray-600  bg-opacity-50 h-screen">
      <div class="editAccount container shadow-md">
        <div class="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t">
          <div class="max-w-sm mx-auto md:w-full md:mx-0">
            <div class="inline-flex items-center space-x-4">
              
              <h1 class="text-gray-600">{name}</h1>
            </div>
          </div>
        </div>
        <div class="bg-white space-y-6">
          <div class="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <h2 class="md:w-1/3 max-w-sm mx-auto">Account</h2>
            <div class="md:w-2/3 max-w-sm mx-auto">
              <label class="text-sm text-gray-400">Email</label>
              <div class="w-full inline-flex border">
                <div class="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                  <svg
                    fill="none"
                    class="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  placeholder={email}
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
            </div>
            
          </div>

          <hr/>
          <div class="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
            <h2 class="md:w-1/3 mx-auto max-w-sm">Personal info</h2>
            <div class="md:w-2/3 mx-auto max-w-sm space-y-5">
            <div>
                <label class="text-sm text-gray-400">Username</label>
                <div class="w-full inline-flex border">
                  <div class="w-1/12 pt-2 bg-gray-100">
                    <svg
                      fill="none"
                      class="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder={receivedData?.username ?? ""}
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label class="text-sm text-gray-400">Full name</label>
                <div class="w-full inline-flex border">
                  <div class="w-1/12 pt-2 bg-gray-100">
                    <svg
                      fill="none"
                      class="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder={name}
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label class="text-sm text-gray-400">Instagram Link</label>
                <div class="w-full inline-flex border">
                  <div class="pt-2 w-1/12 bg-gray-100">
                    <svg
                      fill="none"
                      class="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder={receivedData?.instagramAccountLink ?? ""}
                    value={instagramLink}
                    onChange={(e) => setInstagramLink(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label class="text-sm text-gray-400">Tiktok Link</label>
                <div class="w-full inline-flex border">
                  <div class="pt-2 w-1/12 bg-gray-100">
                    <img class="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24" alt="profile icon" src="/tiktok-svgrepo-com.svg" />
                  </div>
                  <input
                    type="text"
                    class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder={receivedData?.tiktokAccountLink ?? ""}
                    value={tiktokLink}
                    onChange={(e) => setTiktokLink(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label class="text-sm text-gray-400">Facebook Link</label>
                <div class="w-full inline-flex border">
                  <div class="pt-2 w-1/12 bg-gray-100">
                    <img class="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24" alt="profile icon" src="/facebook-svgrepo-com.svg" />
                  </div>
                  <input
                    type="text"
                    class="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder={receivedData?.facebookAccountLink ?? ""}
                    value={facebookLink}
                    onChange={(e) => setFacebookLink(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div class="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
            <h2 class="md:w-4/12 max-w-sm mx-auto">Change password</h2>

            <div class="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
              <div class="w-full inline-flex border-b">
                <div class="w-1/12 pt-2">
                  <svg
                    fill="none"
                    class="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  class="w-11/12 focus:outline-none focus:text-gray-600 p-2 ml-4"
                  placeholder="Coming soon..."
                  disabled
                />
              </div>
            </div>

            <div class="md:w-3/12 text-center md:pl-6">
              <button onClick={() => handleSubmit()} class="text-white pointer w-full mx-auto max-w-sm rounded-md text-center bg-indigo-400 py-2 px-4 inline-flex items-center focus:outline-none md:float-right">
                <svg
                  fill="none"
                  class="w-4 text-white mr-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Update
              </button>
            </div>
          </div>

          <hr />
          <div class="w-full p-4 text-right text-gray-500">
            <button class="inline-flex items-center focus:outline-none mr-4">
              <svg
                fill="none"
                class="w-4 mr-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete account
            </button>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default EditUserProfile;
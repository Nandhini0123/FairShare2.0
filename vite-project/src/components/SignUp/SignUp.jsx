import { useState } from "react";
import monsterBlue from "../../assets/monster-blue.png";
import monsterGreen from "../../assets/monster-green.png";
import monsterPink from "../../assets/monster-pink.png";
import monsterRed from "../../assets/monster-red.png";
import monsterTeal from "../../assets/monster-teal.png";

const avatars = [
  { id: 1, src: monsterRed, alt: "Red Monster" },
  { id: 2, src: monsterBlue, alt: "Blue Monster" },
  { id: 3, src: monsterGreen, alt: "Green Monster" },
  { id: 4, src: monsterTeal, alt: "Teal Monster" },
  { id: 5, src: monsterPink, alt: "Pink Monster" },
];

function SignUp({ closeSignUp }) {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].src);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("FairShare_userName", name);
    localStorage.setItem("FairShare_userAvatar", selectedAvatar);
    closeSignUp();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-[#575757]">Hi There!</h1>
        <p className="mb-4 text-[#575757]">Enter your details to get started</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#575757]">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow border rounded w-full my-2 p-1 bg-white text-charcoal"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Choose your Avatar</label>
            <div className="flex space-x-4 mt-2">
              {avatars.map((avatar) => (
                <img
                  key={avatar.id}
                  src={avatar.src}
                  alt={avatar.alt}
                  className={`w-12 h-12 rounded-full cursor-pointer ${
                    selectedAvatar === avatar.src
                      ? "border-2 border-[#68AEA7]"
                      : ""
                  }`}
                  onClick={() => setSelectedAvatar(avatar.src)}
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#E3315D] text-white py-2 px-4 rounded"
          >
            Let's Go!
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

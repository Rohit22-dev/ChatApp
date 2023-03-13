const Button = ({ type, value, color }) => {
  return (
    <button
      className={`bg-${color}-300 rounded-md p-2 border-2 border-${color}-500 text-slate-700 text-md font-bold`}
    >
      {value}
    </button>
  );
};

const ProfileButton = ({ color, Icon, ps }) => {
  return (
    <button
      className={`bg-${color}-300 hover:bg-${color}-400 group p-5 rounded-full rounded-${ps}-none`}
    >
      <Icon
        size={32}
        className="group-hover:scale-110 ease-in-out duration-200 text-black"
      />
    </button>
  );
};

const HomeButton = ({ text, color, Icon, tColor }) => {
  return (
    <button
      className={`bg-neutral-300 hover:bg-neutral-400 group p-2 rounded-2xl rounded-tr-none rounded-bl-none shadow-md shadow-neutral-600`}
    >
      <div className=" flex gap-2 font-bold ease-in-out duration-200">
        {text}
        {Icon && <Icon size={24} />}
      </div>
    </button>
  );
};

export { Button, ProfileButton, HomeButton };

import soundsLogo from '../assets/sounds-logo.svg';

const Header = () => {
  return (
    <header className="p-4 sticky top-0 flex justify-center items-center">
      <img src={soundsLogo} alt="Sounds" width={56} height={56} />
    </header>
  );
};

export default Header;

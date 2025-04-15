type Props = {
  children?: React.ReactNode;
}

const Centered = ({children}:Props) => {
  return (
    <div className="w-full md:w-[800px] mx-auto">{children}</div>
  )
}

export default Centered;
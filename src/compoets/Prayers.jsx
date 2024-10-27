
const prayer = (props) => {
  return (
    <div
      className="prayer d-flex py-1 align-items-center justify-content-between"
    >
      <span style={{ fontWeight: "500", fontSize:'1.1rem' }}>{props.name}</span>
      <span style={{ fontWeight: "500", fontSize:'.9rem' }}>{props.time}</span>
    </div>
  );
};

export default prayer;

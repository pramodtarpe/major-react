import './Card.css';

export default function Card(props) {
  let classes = props.className;
  return <div className={`card-container ${classes}`}>{props.children}</div>
}

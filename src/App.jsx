import { useState, useEffect } from "react";
import axios from "axios";
import { Rnd } from "react-rnd";
import { BarLoader } from "react-spinners";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import LazyLoad from "react-lazy-load";
import { AiFillDelete } from "react-icons/ai";
import "./App.scss";

function App() {
  const [imageURL, setImageURL] = useState(null);
  const [floatingTexts, setFloatingTexts] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://random.imagecdn.app/v1/image")
      .then((res) => {
        setImageURL(res.data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddText = () => {
    setFloatingTexts([...floatingTexts, text]);
  };

  const handleDeleteText = (index) => {
    const newFloatingTexts = [...floatingTexts];
    newFloatingTexts.splice(index, 1);
    setFloatingTexts(newFloatingTexts);
  };

  return (
    <div className="main">
      {loading ? (
        <BarLoader className="loader" color="#000" width={250} height={30} />
      ) : (
        <>
          <div className="imageCont">
            <LazyLoad>
              <img src={imageURL} alt="random" />
            </LazyLoad>
            {floatingTexts.map((text, index) => (
              <Rnd
                key={index}
                className="rnd"
                default={{
                  x: 300,
                  y: 300,
                }}
                bounds="parent"
                dragGrid={[1, 1]}
              >
                <div className="textCont">{text}</div>
                <div className="deleteCont">
                  <AiFillDelete className="deleteIcon" onClick={() => handleDeleteText(index)} />
                </div>
              </Rnd>
            ))}
          </div>
          <div className="inputMainCont">
            <h2>Enter Text to add to Image</h2>
            <div className="inputForm">
              <FloatingLabel label="Enter Text" className="mb-3">
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter Text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </FloatingLabel>
              <Button type="submit" onClick={handleAddText}>
                Add Text
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

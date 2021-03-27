import React,{useState,useEffect} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { withCookies } from "react-cookie";
import youTube from "../data.json";
import "./../App.css";
import axios from "axios";

// const channelId = "UC_x5XG1OV2P6uZZ5FSM9Ttw";
// const count = 10;

const Tab1 = (props) => {
  const [youtubeData, setYoutubeData] = useState([]);
  const [search, setSearch] = useState("");
  const [displayData, setDisplayData] = useState(false);
  const [reqVideos, setReqVideos] = useState([]);

  useEffect(() => {
    setYoutubeData(youTube);
  }, []);

  // useEffect(()=>{
  //   axios
  //   .get(
  //     `https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&channelId=${channelId}&maxResults=${count}&key=${APIkey}`
  //   )
  //   .then((data) => {
  //     console.log(data.data.items);
  //   })
  //   .then((error) => {
  //     console.log(error);
  //   });
  // },[])

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${search}&key=${process.env.REACT_APP_API_KEY}`
      )
      .then((data) => {
        setReqVideos(data.data.items);
      })
      .then((error) => {
        console.log(error);
      });
    if (props.cookies.get("user_detail")!==undefined) {
      console.log(props.cookies.get("user_detail"))
      setDisplayData(true);
    } else {
      console.log(props.cookies.get("user_detail"))
      alert("You are not logged in. Log in to request videos.");
    }
  };
  return (
    <div>
      <form className="form" onSubmit={(e) => submitHandler(e)}>
        <input
          className="formData"
          type="text"
          name="search"
          value={search}
          onChange={(e) => onChangeHandler(e)}
        />
        <input type="submit" value="Search" />
      </form>
      <Carousel responsive={responsive}>
        {youtubeData.map((video) => {
          let link1 =
            `https://www.youtube.com/embed/` +
            video.contentDetails.upload.videoId;
          return (
            <div key={video.Id} className="video container">
              <iframe
                className="youTube"
                width="460"
                height="315"
                src={link1}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <h5>{video.snippet.title}</h5>
            </div>
          );
        })}
      </Carousel>
      {displayData ? (
        <div>
          <h1>Requested Videos</h1>

          <Carousel responsive={responsive}>
            {reqVideos.map((data) => {
              let link2 = `https://www.youtube.com/embed/` + data.id.videoId;
              return (
                <div key={data.id} className="video container">
                  <iframe
                    className="youTube"
                    width="460"
                    height="315"
                    src={link2}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <h5>{data.snippet.title}</h5>
                </div>
              );
            })}
          </Carousel>
        </div>
      ) : null}
    </div>
  );
};
const UpdatedTb1 = withCookies(Tab1);
export default UpdatedTb1;

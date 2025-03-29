import "./sidebar.css";
import { useEffect, useRef, useState } from "react";
import { RiFireLine, RiShoppingBagLine, RiTimeLine, RiGraduationCapLine, RiThumbUpFill, RiPlayListAddFill, RiHistoryLine,  RiArrowRightSLine, RiMusic2Line, RiFilmLine, RiLiveLine, RiGamepadLine, RiNewsLine, RiTrophyLine, RiSettings3Line, RiFeedbackLine  } from "@remixicon/react";

const Sidebar = () => {
  const[updateDOM, setUpdateDOM] = useState(false)
  const divRef = useRef(null)
  const buttonRef = useRef(null)
  const lessRef = useRef(null)

  const handleRedirect = (url) => {
    window.location.href = url;
  };

  useEffect(()=>{
    if (updateDOM) {
      if (divRef.current) {
        divRef.current.style.display = "block";
      }
      if (buttonRef.current) {
        buttonRef.current.style.display = "none";
      }
      if (lessRef.current) {
        lessRef.current.style.display = "block";
      }
    } else {
      if (divRef.current) {
        divRef.current.style.display = "none";
      }
      if (buttonRef.current) {
        buttonRef.current.style.display = "block";
      }
      if (lessRef.current) {
        lessRef.current.style.display = "none";
      }
    }
  },[updateDOM])

  const ViewMore = () =>{
    setUpdateDOM(true)
  }

  const ViewLess = () =>{
    setUpdateDOM(false)
  }

  return (
    <div className="sidebar-container">
      <ul className="menu-items">
        <li className="menu-item">
          <img src="/assets/home.png" alt="Home" className="icon" />
          <span className="menu-item-text">Home</span>
        </li>
        <li className="menu-item" onClick={() => handleRedirect('https://www.youtube.com/shorts')}>
          <img src="/assets/shorts-icon.png" alt="Explore" className="icon" />
          <span className="menu-item-text">Shorts</span>
        </li>
        <li className="menu-item" onClick={() => handleRedirect('https://www.youtube.com/feed/subscriptions')}>
          <img src="/assets/subscription-icon.png" alt="Subscriptions" className="icon" />
          <span className="menu-item-text">Subscriptions</span>
        </li>
        <div className="line"></div>
        <div className="you">
          <a>You</a>
          <RiArrowRightSLine className="arrow"/>
        </div>
        <li className="menu-item1" onClick={() => handleRedirect('https://www.youtube.com/feed/history')}>
          <RiHistoryLine />
          <span>History</span>
        </li>
        <li className="menu-item1" onClick={() => handleRedirect('https://www.youtube.com/playlist?list=WL')}>
          <RiPlayListAddFill />
          <span>Playlist</span>
        </li>
        <li className="menu-item1" onClick={() => handleRedirect('https://www.youtube.com/feed/library')}>
          <RiGraduationCapLine />
          <span>Your Courses</span>
        </li>
        <li className="menu-item1" onClick={() => handleRedirect('https://www.youtube.com/playlist?list=LL')}>
          <RiTimeLine />
          <span>Watch Later</span>
        </li>
        <li className="menu-item1" onClick={() => handleRedirect('https://www.youtube.com/playlist?list=PL-liked-videos')}>
          <RiThumbUpFill />
          <span>Liked videos</span>
        </li>
        <div className="line"></div>
        <div className="subscriptions">
          <a className="sub-title">Subscriptions</a>
            <li className="menu-item2">
              <a href="https://www.youtube.com/@CodeWithHarry"><img src="/assets/codewithharry.jpg" className="sub"/></a>
              <span><a href="https://www.youtube.com/@CodeWithHarry">CodeWithHarry</a></span>
            </li>
            <li className="menu-item2">
              <a href="https://www.youtube.com/@TheWeeknd"><img src="/assets/weeknd.jpg" className="sub"/></a>
              <a href="https://www.youtube.com/@TheWeeknd"><span>The Weeknd</span></a>
            </li>
            <li className="menu-item2">
              <a href="https://www.youtube.com/@VarunMayya"><img src="/assets/varunmayya.jpg" alt="" className="sub"/></a>
              <a href="https://www.youtube.com/@VarunMayya"><span>Varun Mayya</span></a>
            </li>
            <li className="menu-item2">
              <a href="https://www.youtube.com/@BBKiVines"><img src="/assets/bbkivines.jpg" alt="" className="sub"/></a>
              <a href="https://www.youtube.com/@BBKiVines"><span>BB Ki Vines</span></a>
            </li>
            <li className="menu-item2">
              <a href="https://www.youtube.com/@joerogan"><img src="/assets/joerogan.jpg" alt="" className="sub"/></a>
              <a href="https://www.youtube.com/@joerogan"><span>Joe Rogan</span></a>
            </li>
            <li className="menu-item2">
              <a href="https://www.youtube.com/@KaranAujlaOfficial"><img src="/assets/karanaujla.jpg" alt="" className="sub"/></a>
              <a href="https://www.youtube.com/@KaranAujlaOfficial"><span>Karan Aujla</span></a>
            </li>
            <li className="menu-item2">
              <a href="https://www.youtube.com/@PJExplained"><img src="/assets/pjexplained.jpg" alt="" className="sub"/></a>
              <a href="https://www.youtube.com/@PJExplained"><span>PJ Explained</span></a>
            </li>
            <li className="menu-item2">
              <a href="https://www.youtube.com/@TravisScottXX"><img src="/assets/travisscott.jpg" alt="" className="sub"/></a>
              <a href="https://www.youtube.com/@TravisScottXX"><span>Travis Scott</span></a>
            </li>
            <li className="menu-item2">
              <a href="https://www.youtube.com/@JeffNippard"><img src="/assets/jeffnippard.jpg" alt="" className="sub" /></a>
              <a href="https://www.youtube.com/@JeffNippard"><span>Jeff Nippard</span></a>
            </li>
            <button className="view" onClick={ViewMore} ref={buttonRef}>View More</button>
            <div className="sub-more" ref={divRef}>
              <li className="menu-item2">
                <a href="https://www.youtube.com/@TheHarshBeniwal"><img src="/assets/harshbeniwal.jpg" alt="" className="sub"/></a>
                <a href="https://www.youtube.com/@TheHarshBeniwal"><span>Harsh Beniwal</span></a>
              </li>
              <li className="menu-item2">
                <a href="https://www.youtube.com/@rajshamani"><img src="/assets/rajshamani.jpg" alt="" className="sub"/></a>
                <a href="https://www.youtube.com/@rajshamani"><span>Raj Shamani</span></a>
              </li>
              <li className="menu-item2">
                <a href="https://www.youtube.com/@veritasium"><img src="/assets/veritasium.jpg" alt="" className="sub"/></a>
                <a href="https://www.youtube.com/@veritasium"><span>Veritasium</span></a>
              </li>
              <li className="menu-item2">
                <a href="https://www.youtube.com/@ThinkSchool"><img src="/assets/thinkschool.jpg" alt="" className="sub"/></a>
                <a href="https://www.youtube.com/@ThinkSchool"><span>Think School</span></a>
              </li>
            </div>
            <button className="view-less" onClick={ViewLess} ref={lessRef}>View Less</button>
        </div>
        <div className="line"></div>
        <div className="explore">
          <a>Explore</a>
          <li className="menu-item1" onClick={() => handleRedirect('https://www.youtube.com/feed/trending')}>
            <RiFireLine />
            <span>Trending</span>
          </li>
          <li className="menu-item1" onClick={() => handleRedirect('https://www.youtube.com/channel/UCkYQyvc_i9hXEo4xic9Hh2g')}>
            <RiShoppingBagLine />
            <span>Shopping</span>
          </li>
          <li className="menu-item1" onClick={() => handleRedirect('https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ')}>
            <RiMusic2Line />
            <span>Music</span>
          </li>
          <li className="menu-item1" onClick={() => handleRedirect('https://www.youtube.com/feed/storefront?bp=ogUCKAU%3D')}>
            <RiFilmLine />
            <span>Movies</span>
          </li>
          <li className="menu-item1" onClick={() => handleRedirect('https://www.youtube.com/channel/UC4R8DWoMoI7CAwX8_LjQHig')}>
            <RiLiveLine />
            <span>Live</span>
          </li>
          <li className="menu-item1" onClick={() => handleRedirect('https://www.youtube.com/gaming')}>
            <RiGamepadLine />
            <span>Gaming</span>
          </li>
          <li className="menu-item1" onClick={() => handleRedirect('https://www.youtube.com/channel/UCYfdidRxbB8Qhf0Nx7ioOYw')}>
            <RiNewsLine />
            <span>News</span>
          </li>
          <li className="menu-item1" onClick={() => handleRedirect('https://www.youtube.com/channel/UCEgdi0XIXXZ-qJOFPf4JSKw')}>
            <RiTrophyLine />
            <span>Sports</span>
          </li>
          <li className="menu-item1" onClick={() => handleRedirect('https://www.youtube.com/feed/courses_destination')}>
            <RiGraduationCapLine />
            <span>Courses</span>
          </li>
        </div>
        <div className="line"></div>
        <div className="more-options">
          <div className="menu-item1">
            <RiSettings3Line />
            <span>Settings</span>
          </div>
          <div className="menu-item1">
            <RiFeedbackLine />
            <span>Send Feedback</span>
          </div>
          <div className="line">
            <div className="side-footer">
              <div className="menu-item4">
                <a>About</a>
              </div>
              <div className="menu-item4">
                <a>Contact Us</a>
              </div>
            </div>
            <div className="menu-item4">
                <a>&copy; 2025</a>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};


export default Sidebar;

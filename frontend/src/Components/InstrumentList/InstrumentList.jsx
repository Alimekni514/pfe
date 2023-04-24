import { useState, useEffect } from "react";
import "../../Css/InstrumentList/InstrumentList.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import keyboards from "../../Assets/Images/keyboards.png";
import brass from "../../Assets/Images/brass.png";
import strings from "../../Assets/Images/strings.png";
import Swal from "sweetalert2";
const InstrumentList = ({
  titleobject,
  token,
  collection,
  setModalIsOpen1,
  setuserscores,
}) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [InstrumentsWithCount, setInstrumentsWithCount] = useState([]);
  const { title, settitle } = titleobject;
  const [instruments, setInstruments] = useState({
    trumpet: {
      group: "brass",
      name: "trumpet",
      count: 0,
    },
    trombone: {
      group: "brass",
      name: "trombone",
      count: 0,
    },
    horn: {
      group: "brass",
      name: "horn",
      count: 0,
    },
    horninc: {
      group: "brass",
      name: "horn-in-c",
      count: 0,
    },
    hornind: {
      group: "brass",
      name: "horn-in-d",
      count: 0,
    },
    baritonehorn: {
      group: "brass",
      name: "baritone-horn",
      count: 0,
    },
    tuba: {
      group: "brass",
      name: "tuba",
      count: 0,
    },
    piano: {
      group: "keyboards",
      name: "piano",
      count: 0,
    },
    harpsichord: {
      group: "keyboards",
      name: "harpsichord",
      count: 0,
    },
    celesta: {
      group: "keyboards",
      name: "celesta",
      count: 0,
    },
    organ: {
      group: "keyboards",
      name: "organ",
      count: 0,
    },
    cello: {
      group: "strings",
      name: "hq-cello",
      count: 0,
    },
    contrabass: {
      group: "strings",
      name: "contrabass",
      count: 0,
    },
    Violin: {
      group: "strings",
      name: "hq-violin",
      count: 0,
    },
  });

  const groups = {
    brass: [
      "trumpet",
      "trombone",
      "horn",
      "horninc",
      "hornind",
      "baritonehorn",
      "tuba",
    ],
    keyboards: ["piano", "harpsichord", "celesta", "organ"],
    strings: ["cello", "contrabass", "Violin"],
    // add more groups and instruments as needed
  };
  const groupsimage = {
    brass: brass,
    keyboards: keyboards,
    strings: strings,
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const handleCounterUpdate = (instrument, count) => {
    setInstruments((prev) => ({
      ...prev,
      [instrument]: { ...prev[instrument], count },
    }));
    //filter instruments with
  };
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    const query = event.target.value.toLowerCase();
    console.log(query);
    //get the array of names from the object keys
    const instrumentNames = Object.keys(instruments);
    //Filter the instruments based on the search query
    const filteredInstruments = instrumentNames.filter((name) => {
      return instruments[name].name.toLowerCase().includes(query);
    });

    console.log(filteredInstruments);
    //find the group that contains the filtred instruments
    const filteredGroup = Object.keys(groups).find((group) => {
      return groups[group].some((instrument) =>
        filteredInstruments.includes(instrument)
      );
    });
    setSelectedGroup(filteredGroup || null);
  };

  useEffect(() => {
    //filter instruments with count value >0
    let instrumentsc = [];
    for (let instrument in instruments) {
      if (instruments[instrument].count > 0) {
        instrumentsc.push(instrument);
      }
    }
    console.log(instrumentsc);
    //Update the state
    setInstrumentsWithCount(instrumentsc);
  }, [instruments]);
  //handletest
  const handletest = (e) => {
    e.target.textContent = "Loading...";
    e.target.style.backgroundColor = "#ececec";
    const instrumentList = Object.values(instruments)
      .filter(({ count }) => count > 0)
      .map(({ group, name, count }) => {
        const result = [{ group, instrument: name }];
        if (count > 1) {
          for (let i = 2; i <= count; i++) {
            result.push({ group, instrument: name });
          }
        }
        return result;
      })
      .flat();
    const urlapi = "https://api.flat.io/v2/scores";
    fetch(urlapi, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        privacy: "private",
        collection: collection,
        builderData: {
          scoreData: {
            instruments: instrumentList,
          },
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const currentuserlink = "https://api.flat.io/v2/me";
        fetch(currentuserlink, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const userscores = `https://api.flat.io/v2/users/${data.id}/scores`;
            fetch(userscores, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                setuserscores(data);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));

        setModalIsOpen1(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Score has been created Successfully",
          showConfirmButton: false,
          timer: 2500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });

    console.log(instrumentList);
  };

  return (
    <div className="instrument-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for an instrument"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="instrumentBody">
        <ul>
          {Object.keys(groups).map((group) => (
            <li key={group}>
              <button
                className={
                  selectedGroup === group
                    ? "group-button selected"
                    : "group-button"
                }
                onClick={() => handleGroupClick(group)}
              >
                <img
                  src={groupsimage[group]}
                  alt={group}
                  style={{ width: "30px" }}
                />
                {group}
                {selectedGroup === group ? <FaAngleUp /> : <FaAngleDown />}
              </button>
              {selectedGroup === group && (
                <div>
                  <ul className="instrument-list">
                    {groups[group].map((instrument) => (
                      <li key={instrument}>
                        {instruments[instrument].name}
                        <div className="counter-container">
                          <button
                            className="counter-button"
                            onClick={() =>
                              handleCounterUpdate(
                                instrument,
                                instruments[instrument].count - 1
                              )
                            }
                          >
                            -
                          </button>
                          <span className="counter-value">
                            {instruments[instrument].count}
                          </span>
                          <button
                            className="counter-button"
                            onClick={() =>
                              handleCounterUpdate(
                                instrument,
                                instruments[instrument].count + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="instrumentselected">
          <p>Instruments Selected:</p>
          {InstrumentsWithCount &&
            InstrumentsWithCount.map((Instrument) => (
              <p key={Instrument} className="selectedinst">
                {Instrument}{" "}
              </p>
            ))}
        </div>
      </div>
      <div className="instrumentlistbody">
        <div>
          <span>{InstrumentsWithCount.length} </span> Of{" "}
          <span>{Object.keys(instruments).length}</span>Selected
        </div>
        <button className="createsc" onClick={handletest}>
          Create Score
        </button>
      </div>
    </div>
  );
};
export default InstrumentList;

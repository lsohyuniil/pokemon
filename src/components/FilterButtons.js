// import React from "react";
// import { useState } from "react";
// import "./FilterButtons.css";
// import PokemonTypeBadge from "./PokemonTypeBadge";
// import { typeTranslations } from "../utils/types";

// function FilterButtons({ isOpen, setIsOpen }) {
//     const [isClick, setIsClick] = useState(false);

//     const toggleFilter = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <div>
//             {isOpen && (
//                 <div className="filter-options">
//                     {Object.keys(typeTranslations).map((key) => {
//                         return (
//                             <button className="filter-option" key={key}>
//                                 <PokemonTypeBadge type={key}/>
//                             </button>
//                         );
//                         })}
//                     </div>
//                 )}

//             <button className="type-btn" onClick={toggleFilter}>
//                 <span>타입 선택</span>
//             </button>
//         </div>
//     );
// }

// export default FilterButtons;


// import React, { useState } from "react";
import "./css/FilterButtons.css";
import PokemonTypeBadge from "./PokemonTypeBadge";
import { typeTranslations } from "../utils/types";

function FilterButtons({ selectedTypes, setSelectedTypes, isOpen, setIsOpen }) {
    // const [selectedTypes, setSelectedTypes] = useState({});

    const toggleFilter = () => {
        setIsOpen(!isOpen);
    };

    const handleTypeClick = (type) => {
        setSelectedTypes((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    return (
        <div className="type-container">
            {isOpen && (
                <div className="filter-options">
                    {Object.keys(typeTranslations).map((key) => (
                        <button 
                            className={`filter-option ${selectedTypes[key] ? "active" : "inactive"}`} 
                            key={key} 
                            onClick={() => handleTypeClick(key)}
                        >
                            <PokemonTypeBadge type={key} />
                        </button>
                    ))}
                </div>
            )}
            <div className="divtest">
                <button className={`type-btn ${isOpen ? "" : "type-btn-close"}`} onClick={toggleFilter}>
                    <span>타입 선택</span>
                </button>
            </div>
        </div>
    );
}

export default FilterButtons;


// import React, { useState } from "react";
// import "./FilterButtons.css";
// import PokemonTypeBadge from "./PokemonTypeBadge";
// import { typeTranslations } from "../utils/types";

// function FilterButtons({ isOpen, setIsOpen }) {
//     // 각 버튼에 대한 클릭 상태를 관리하는 배열
//     const [clickStates, setClickStates] = useState(
//         Object.keys(typeTranslations).reduce((acc, type) => {
//             acc[type] = false; // 각 타입에 대해 초기 클릭 상태는 false
//             return acc;
//         }, {})
//     );

//     const toggleFilter = () => {
//         setIsOpen(!isOpen);
//     };

//     // 버튼 클릭 시 상태를 변경하는 함수
//     const toggleClickState = (type) => {
//         setClickStates((prevStates) => ({
//             ...prevStates,
//             [type]: !prevStates[type], // 클릭 상태 토글
//         }));
//     };

//     return (
//         <div>
//             {isOpen && (
//                 <div className="filter-options">
//                     {Object.keys(typeTranslations).map((key) => {
//                         return (
//                             <button
//                                 className="filter-option"
//                                 key={key}
//                                 onClick={() => toggleClickState(key)} // 개별 클릭 상태 토글
//                             >
//                                 <PokemonTypeBadge
//                                     type={key}
//                                     isClick={clickStates[key]} // 개별 클릭 상태 전달
//                                     setIsClick={() => {}} // setIsClick은 필요 없으므로 빈 함수 전달
//                                 />
//                             </button>
//                         );
//                     })}
//                 </div>
//             )}

//             <button className="type-btn" onClick={toggleFilter}>
//                 <span>타입 선택</span>
//             </button>
//         </div>
//     );
// }

// export default FilterButtons;

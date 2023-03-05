import { useState } from "react"

import styled from "styled-components"
import { Check, X } from "react-feather"

export const SuccessIcon = styled(
    ({ className, size = 16 }) => {
        return (
            <Check
                className={className}
                size={size}
            />
        )
    })`
    color: green;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 2px;
    `


export const ErrorIcon = styled(
    ({ className, size = 16 }) => {
        return (
            <X
                className={className}
                size={size}
            />
        )
    })`
        color: red;
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 2px;
        `

export const Slider = styled(
    ({ className }) => {

        const [value, setValue] = useState(10)

        const handleChange = (e) => {
            setValue(e.target.value)
        }

        return (
            <div className={className}>
                <div class="slidecontainer">
                    <input type="range" min="1" max="100" value={value} onChange={handleChange} class="slider" id="myRange" />
                </div>
            </div>
        )
    })`
    .slidecontainer {
        width: 100%; /* Width of the outside container */
      }
      
      /* The slider itself */
      .slider {
        -webkit-appearance: none;  /* Override default CSS styles */
        appearance: none;
        width: 100%; /* Full-width */
        height: 25px; /* Specified height */
        background: #d3d3d3; /* Grey background */
        outline: none; /* Remove outline */
        opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
        -webkit-transition: .2s; /* 0.2 seconds transition on hover */
        transition: opacity .2s;
      }
      
      /* Mouse-over effects */
      .slider:hover {
        opacity: 1; /* Fully shown on mouse-over */
      }
      
      /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
      .slider::-webkit-slider-thumb {
        -webkit-appearance: none; /* Override default look */
        appearance: none;
        width: 25px; /* Set a specific slider handle width */
        height: 25px; /* Slider handle height */
        background: #5bc0de; /* Green background */
        cursor: pointer; /* Cursor on hover */
      }
      
      .slider::-moz-range-thumb {
        width: 25px; /* Set a specific slider handle width */
        height: 25px; /* Slider handle height */
        background: #5bc0de; /* Green background */
        cursor: pointer; /* Cursor on hover */
      }
    `
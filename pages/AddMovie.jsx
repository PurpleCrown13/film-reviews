import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddMovie.css";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Slider } from "@nextui-org/react";


const AddMovie = () => {
    const history = useNavigate();
    const { t, i18n } = useTranslation();
    useEffect(() => {
        const login = localStorage.getItem("login");
        window.scrollTo(0, 0);
        if (!login) {
            history("/login");
            return;
        }
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        season: "",
        image: "",
        year: "",
        date: new Date(), 
        genre: "",
        franchise: "",
        comment: "",
        visual: 1,
        originality: 1,
        atmosphere: 1,
        plot: 1,
        rating: 1,
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const formattedDate = `${String(formData.date.getDate()).padStart(2, '0')}/${String(formData.date.getMonth() + 1).padStart(2, '0')}/${String(formData.date.getFullYear())}`;

        try {
            const response = await axios.post(
                "http://hellafragilesite.com/film-reviews-api/api-add-all.php",
                { ...formData, login: localStorage.getItem("login"), date: formattedDate },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
            console.log(response.data);
            history("/");

            setFormData({
                name: "",
                season: "",
                image: "",
                year: "",
                date: new Date(),
                genre: "",
                plot: 0,
                visual: 0,
                originality: 0,
                atmosphere: 0,
                rating: 0,
                franchise: "",
                comment: "",
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSliderChange = (name, value) => {
        setFormData((prevFormData) => {
            const updatedFormData = {
                ...prevFormData,
                [name]: value,
            };
            return {
                ...updatedFormData,
                rating: calculateRating(updatedFormData),
            };
        });
    };

    const calculateRating = (formData) => {
        const { visual, originality, atmosphere, plot } = formData;
        const total = visual + originality + atmosphere + plot;
        const average = total / 4;
        return Math.round(average);
    };

    const genres = [
        { value: "Фильм", label: t("main.movie") },
        { value: "Аниме", label: t("main.anime") },
        { value: "Мультфильм", label: t("main.cartoon") },
        { value: "Сериал", label: t("main.serial") },
    ];

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -100,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.3,
            }}
        >
            <Helmet>
                <title>
                    {t('header.add')}
                </title>
            </Helmet>
            <div>
               
                <form onSubmit={handleFormSubmit} className="add-movie-container">
                    <div className="next-ui-input">
                        <Input
                            size="lg"
                            isClearable
                            type="text"
                            label={t("main.title")}
                            name="name"
                            onChange={handleInputChange}
                            style={{ fontSize: "22px" }}
                            labelPlacement="outside"
                            isRequired
                        />
                    </div>
                    <div className="next-ui-input">
                        <Input
                            size="lg"
                            isClearable
                            type="text"
                            label={t("main.season")}
                            name="season"
                            onChange={handleInputChange}
                            style={{ fontSize: "22px" }}
                            labelPlacement="outside"
                            isRequired
                        />
                    </div>
                    <div className="next-ui-input">
                        <Input
                            size="lg"
                            isClearable
                            type="text"
                            label={t("main.image")}
                            name="image"
                            onChange={handleInputChange}
                            style={{ fontSize: "22px" }}
                            labelPlacement="outside"
                            isRequired
                        />
                    </div>
                    <div className="next-ui-input">
                        <Input
                            size="lg"
                            isClearable
                            type="text"
                            label={t("main.year")}
                            name="year"
                            onChange={handleInputChange}
                            style={{ fontSize: "22px" }}
                            labelPlacement="outside"
                            isRequired
                        />
                    </div>
                    <div className="next-ui-input ">
                        <Select
                            value={formData.genre}
                            onChange={handleInputChange}
                            name="genre"
                            isRequired
                            className="max-w-xs dark ui-select"
                            labelPlacement={"outside"}
                            placeholder={t("main.genre")}
                        >
                            {genres.map((genre) => (
                                <SelectItem key={genre.value} value={genre.value} >
                                    {genre.label}
                                    </SelectItem>
                            ))}

                        </Select>
                    </div>
                    <div className="next-ui-input">
                        <DatePicker
                            selected={formData.date}
                            onChange={(date) => setFormData({ ...formData, date })}
                            dateFormat="dd/MM/yyyy"
                            name="date"
                            placeholderText={t("main.date")}
                            required
                            className="datepicker"
                        />
                    </div>
                    <div className="slider-container">
                        <Slider
                            size="lg"
                            label={t("main.plot")}
                            step={1}
                            maxValue={10}
                            minValue={1}
                            defaultValue={1}
                            className="max-w-md next-ui-slider"
                            showSteps
                            getValue={(evaluation) => `${evaluation} из 10`}
                            onChange={(value) => handleSliderChange("plot", value)}
                            classNames={{
                                base: "max-w-md gap-3",
                                track: "border-s-blue-900",
                                filler: "bg-gradient-to-r from-blue-900  via-blue-600  to-blue-300",
                                thumb: [
                                    "bg-blue-300",
                                ],
                                
                            }}
                        />
                        <Slider
                            size="lg"
                            label={t("main.visual")}
                            step={1}
                            maxValue={10}
                            minValue={1}
                            defaultValue={1}
                            className="max-w-md next-ui-slider"
                            showSteps
                            getValue={(evaluation) => `${evaluation} из 10`}
                            onChange={(value) => handleSliderChange("visual", value)}
                            classNames={{
                                base: "max-w-md gap-3",
                                track: "border-s-pink-900",
                                filler: "bg-gradient-to-r from-pink-900  via-pink-600  to-pink-300",
                                thumb: [
                                    "bg-pink-300",
                                ],

                            }}
                        />
                        <Slider
                            size="lg"
                            label={t("main.originality")}
                            step={1}
                            maxValue={10}
                            minValue={1}
                            defaultValue={1}
                            className="max-w-md next-ui-slider"
                            showSteps
                            getValue={(evaluation) => `${evaluation} из 10`}
                            onChange={(value) => handleSliderChange("originality", value)}
                            classNames={{
                                base: "max-w-md gap-3",
                                track: "border-s-orange-900",
                                filler: "bg-gradient-to-r from-orange-900  via-orange-600  to-orange-300",
                                thumb: [
                                    "bg-orange-300",
                                ],

                            }}
                        />
                        <Slider
                            size="lg"
                            label={t("main.atmosphere")}
                            step={1}
                            maxValue={10}
                            minValue={1}
                            defaultValue={1}
                            className="max-w-md next-ui-slider"
                            showSteps
                            getValue={(evaluation) => `${evaluation} из 10`}
                            onChange={(value) => handleSliderChange("atmosphere", value)}
                            classNames={{
                                base: "max-w-md gap-3",
                                track: "border-s-lime-900",
                                filler: "bg-gradient-to-r from-lime-900  via-lime-600  to-lime-300",
                                thumb: [
                                    "bg-lime-300",
                                ],

                            }}
                        />

                        <div>
                            <label htmlFor="rating"></label>
                            <br />
                            <br />
                            <span>
                                <div className="final-rating">{formData.rating}</div>
                            </span>
                        </div>
                    </div>
                    <div className="next-ui-area">
                        <Textarea
                            name="comment"
                            placeholder={t("dlc.review")}
                            onChange={handleInputChange}
                            minRows={20}
                            maxRows={30}
                            style={{ fontSize: "22px", padding: "30px", lineHeight: "1.5" }}
                            className="next-ui-area"
                        />

                    </div>
                    <div className="next-ui-input">
                        <Input  size="lg" isClearable type="text" label={t("main.franchise")} name="franchise" onChange={handleInputChange} style={{ fontSize: "22px"}} labelPlacement="outside" />
                    </div>
    
                    <Button variant="flat" className="add-buttton" type="submit">
                        {t("main.add")}
                    </Button>
                </form>
            </div>
        </motion.div>
    );
};

export default AddMovie;

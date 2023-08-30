const regImage = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif)$/i;
const regName = /^[a-zA-Z\s]+$/;
const regNumber = /^(?:[1-9][0-9]?|100)$/;

const validate = (formData) => {
    const errors = {};
    if (!regImage.test(formData.image)) errors.image = "Url image is not valid";
    if (!formData.image) errors.image = "Image is required";

    if (!regName.test(formData.name)) errors.name = "Name is not valid";
    if (!formData.name) errors.name = "Name is required";

    if  (!regNumber.test(formData.heightMin)) errors.heightMin = "Value is not valit"
    if  (!regNumber.test(formData.heightMax)) errors.heightMax = "Value is not valit"
    if  (!regNumber.test(formData.weightMin)) errors.weightMin = "Value is not valit"
    if  (!regNumber.test(formData.weightMax)) errors.weightMax = "Value is not valit"
    if  (!regNumber.test(formData.lifeSpan)) errors.lifeSpan = "Value is not valit"

    if (Number(formData.heightMin) >= Number(formData.heightMax)) {
        errors.heightMax = "Minimum cannot be greater than or equal to maximum";
    }
    if (!formData.heightMin && !formData.heightMax) errors.heightMin = "Minimum height is required";
    if (!formData.heightMax) errors.heightMax = "Maximum height is required";

    if (Number(formData.weightMin) >= Number(formData.weightMax)) errors.weightMax = "Minimum cannot be greater than or equal to maximum";
    if (!formData.weightMin && !formData.weightMax) errors.weightMin = "Minimum weight is required";
    if (!formData.weightMax) errors.weightMax = "Maximum weight is required";

    if (!formData.lifeSpan) errors.lifeSpan = "Life span is required";

    if (!formData.temperaments || formData.temperaments.length === 0) errors.temperaments = "Not selected any value yet";
    return errors;
}

export default validate
// import PhoneFilterInput from './PhoneFilterInput'
import NumberFilterInput from './NumberFilterInput'
import TextFilterInput from './TextFilterInput'
import MultiSelectFilterInput from './MultiSelectFilterInput'
import PriceFilterInput from './PriceFilterInput'
// import ImageFilterInput from './ImageFilterInput'
import SwitchFilterInput from './SwitchFilterInput'
// import MapFilterInput from './MapFilterInput'
// import MapFilterInputLeaflet from './MapFilterInputLeaflet'

// import DateFilterInput from './DateFilterInput'
import FromToInput from './FromToInput'
import SelectListInput from './SelectListInput'


const inputComponents = {
    // PhoneInput: PhoneFilterInput,
    NumberInput: NumberFilterInput,
    TextInput: TextFilterInput,
    SelectInput: MultiSelectFilterInput,
    TextAreaInput: TextFilterInput,
    PriceInput: PriceFilterInput,
    // DateInput: DateFilterInput,

    AdvancedSelectInput: MultiSelectFilterInput,
    MultiSelectInput: MultiSelectFilterInput,
    // ImageInput:ImageFilterInput,
    SwitchInput: SwitchFilterInput,
    // MapFilterInput: MapFilterInputLeaflet,
    // MapLeafletInput:MapFilterInputLeaflet,
    FromToInput: FromToInput,
    // FromToInput: FromToInput,

    // DateInput: DateFilterInput,
    SelectListInput: SelectListInput
}

export default (inputComponents);
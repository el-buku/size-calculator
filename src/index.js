export const getSize = (data, sizes) => {


    const getSizes = (ml, user, sizes) => {
        var ret = []
        if (user == 'children') {
            sizes.slice(-5)
        } else if (user == 'elderly') {
            sizes.slice(-6)
        }
        console.log(ml)
        for (var size of sizes) {
            console.log(size[1])
            if (ml <= size[1] * 0.8)
                ret.push(size[0])
        }
        return ret
    }
    const {ingredientType, measurementUnit, quantity, density, user} = data
    var capsuleMl, capsuleMg
    if (ingredientType == "powder") {
        capsuleMg = getQtyToG(quantity, measurementUnit)
        capsuleMl = capsuleMg * density

    } else {
        capsuleMl=getQtyMl(quantity, measurementUnit)
    }
    const recommendedSizes = getSizes(capsuleMl, user, sizes)
    console.log(recommendedSizes)
    return recommendedSizes[0]

}

export const getQtyMl = (quantity, measurementUnit)=>{
    var ret
    switch(measurementUnit){
        case 'ts':
            ret=4.92*quantity
            break
        case 'tbs':
            ret=14.78*quantity
            break
        default:
            ret=quantity
    }
    return ret
}

export const getMlToQty = (mls, measurementUnit) =>{
    var ret
    switch(measurementUnit){
        case 'ts':
            ret=mls/4.92
            break
        case 'tbs':
            ret=mls/14.78
            break
        default:
            ret=mls
    }
    return ret
}

export const getTypes = (user, ingredientType) => {
    if (user=='pets'){
        return 'Beef, Chicken'
    } else if(ingredientType=='powder'){
        return 'Vegetarian, Gelatin'
    } else {
        return 'Vegetarian'
    }
}

export const getQtyToG = (quantity, measurementUnit) => {
    var ret
    switch (measurementUnit) {
        case 'mg':
            ret = quantity / 1000
            break
        case 'mcg':
            ret = quantity / 1000000
            break
        case 'g':
            ret = quantity
            break
    }
    return ret
}
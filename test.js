const str = "Bearer 123aml;amdawl;law;da;wckaw;ak; Good Morning kurt"
// const str = "123aml;amdawl;law;da;wckaw;ak;"

let token


if(str && str.startsWith("Bearer")){
    console.log(str)
    token = str.split(" ");
    // console.log(to)
} else {
    console.log('waray!')
}


console.log(token[1])
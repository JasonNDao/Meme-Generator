import React from 'react'

class Meme extends React.Component {
    state=7 //new state
    constructor() {
        super()
        this.state = {
            toptext: "",
            bottext: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            memeI: []
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleChange=(event)=> {   //new way to bind
        const { name, value } = event.target
        this.setState({ [name]: value })
    }
    handleSubmit(event) {
        event.preventDefault()  //when using onsubmit, usually reloads, prevents reloading, because reloading loads first img instead og generating new one
        const randNum = Math.floor(Math.random() * this.state.memeI.length)  //get random number
        const randMemeImg = this.state.memeI[randNum].url       //get url property of memeI
        this.setState({ randomImg: randMemeImg })//set state
    }
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                this.setState({ memeI: memes })
            })
    }
    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}> 
                    <input
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                     <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>


            </div>

        )
    }
}
export default Meme
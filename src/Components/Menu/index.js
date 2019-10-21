import React from 'react';
import {
    Col,
    Card,
    CardGroup,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import $ from "jquery";
import './menu.css'

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            menuSections: [],
            sections: [],
            items: [],
            selectedSectionId: '',
            itemsFromSection: []
        };
    }

    fetchItems = () => {
        fetch('api/items')
        .then(response => response.json())
        .then((data) => {
            this.setState({
                items: data
            });            
        })
    };

    fetchSections = () => {
        fetch('api/sections')
        .then(response => response.json())
        .then((data) => {
            const menuSectionIds = this.state.menuSectionIds;
            
            let menuSections = data.filter((singleSection) => menuSectionIds.indexOf(singleSection._id) >= 0);
            
            this.setState({
                menuSections,
                sections: data
            });            
        })

        this.fetchItems();
    }

    componentDidMount = () => {
        fetch('api/menu')
        .then(response => response.json())
        .then((data) => {
            const sectionIds = data.options.map((singleOption) => singleOption._ref);
            this.setState({
                menu: data,
                menuSectionIds: sectionIds
            });
            
            this.fetchSections()
        })
    }
    
    sectionSelcted = (data) => {
        console.log("Item selected", data);
        let optionIds = data.options.map(key => key._ref);

        const existingItems = this.state.items;

        let itemsFromSection = existingItems.filter((singleItem) => optionIds.indexOf(singleItem._id) >= 0);
        
        this.setState({
            selectedSectionId: data._id,
            itemsFromSection
        });
        
    };

    dynamicSections = () => {
        return this.state.menuSections.map((singleSection, key) => {
            let imageUrl = 'http://localhost:3001/images/';
            if (singleSection.image && singleSection.image.asset && singleSection.image.asset._ref) {
                imageUrl += singleSection.image.asset._ref;
            } else {
                imageUrl += 'no-image-found.jpg';
            }
            return (
                <Card className="col-md-3" key={key} onClick={() => this.sectionSelcted(singleSection)}>
                    <div className="col-md-12">
                        <div className="col-md-12 image-section text-center">
                            <Card.Img variant="top" src={imageUrl} />
                        </div>
                        <Card.Body className="text-center">
                            <Card.Title>{singleSection && singleSection.name && singleSection.name.en ? singleSection.name.en : 'No name available'}</Card.Title>
                        </Card.Body>
                    </div>
                </Card>
            )
        })
    };

    dynamicItems = () => {
        return this.state.itemsFromSection.map((singleSection, key) => {
            let imageUrl = 'http://localhost:3001/images/';
            if (singleSection.image && singleSection.image.asset && singleSection.image.asset._ref) {
                imageUrl += singleSection.image.asset._ref;
            } else {
                imageUrl += 'no-image-found.jpg';
            }
            return (
                <Card className="col-md-3" key={key}>
                    <div className="col-md-12">
                        <div className="col-md-12 image-section text-center">
                            <Card.Img variant="top" src={imageUrl} />
                        </div>
                        <Card.Body className="text-center">
                            <Card.Title>{singleSection && singleSection.name && singleSection.name.en ? singleSection.name.en : 'No name available'}</Card.Title>
                        </Card.Body>
                    </div>
                </Card>
            )
        })
    };

    scroll = (direction) => {
        let far = $( '.image-container' ).width()/2*direction;
        let pos = $('.image-container').scrollLeft() + far;
        $('.image-container').animate( { scrollLeft: pos }, 1000)
    }

    sectionSlider = () => {
        const selectedSectionId = this.state.selectedSectionId;

        return this.state.menuSections.map((singleSectionItem) => {
            let imageUrl = 'http://localhost:3001/images/';
            if (singleSectionItem.image && singleSectionItem.image.asset && singleSectionItem.image.asset._ref) {
                imageUrl += singleSectionItem.image.asset._ref;
            } else {
                imageUrl += 'no-image-found.jpg';
            }

            return (
                <Col className={`image col-md-2 polaroid ${selectedSectionId === singleSectionItem._id ? 'active' : ''}`} onClick={() => this.sectionSelcted(singleSectionItem)}>
                    <img src={imageUrl} style={{width:"100%",marginTop:"5px"}}/>
                    <p>
                        {singleSectionItem && singleSectionItem.name && singleSectionItem.name.en ? singleSectionItem.name.en : 'No name available'}
                    </p>
                </Col>
            );
        })
    };

    render() {
        return(
            <div>
                <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                <Link to="/home">
                        <Button variant="primary" style={{marginRight:"15px"}}>
                            Back
                        </Button>
                    </Link>
                    Web App Title
                </a>
                </nav>
               

                <Col className="wrapper col-md-12" style={{margin:"10px"}}>
                    <a href="#" className="prev" onClick={this.scroll.bind(null,-1)}>&#10094;</a>
                    <div className="image-container">
                        {this.sectionSlider()}
                    </div>
                    <a href="#" className="next" onClick={this.scroll.bind(null,1)}>&#10095;</a>
                </Col>
                
                <Col style={{marginTop: "20px",}}>
                    <>
                        {
                            this.state.selectedSectionId !== '' ?
                                this.dynamicItems() :
                                this.dynamicSections()
                        }
                    </>
                </Col>
            </div>
        )
    }
};
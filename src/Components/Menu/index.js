import React from 'react';
import {
    Col,
    Card,
    CardColumns,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import $ from "jquery";

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
                <Card key={key} onClick={() => this.sectionSelcted(singleSection)}>
                    <Card.Img variant="top" src={imageUrl} />
                    <Card.Body className="text-center">
                        <Card.Title>{singleSection && singleSection.name && singleSection.name.en ? singleSection.name.en : 'No name available'}</Card.Title>
                    </Card.Body>
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
                <Card key={key}>
                    <Card.Img variant="top" src={imageUrl} />
                    <Card.Body className="text-center">
                        <Card.Title>{singleSection && singleSection.name && singleSection.name.en ? singleSection.name.en : 'No name available'}</Card.Title>
                    </Card.Body>
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
        return this.state.menuSections.map((singleSectionItem) => {
            let imageUrl = 'http://localhost:3001/images/';
            if (singleSectionItem.image && singleSectionItem.image.asset && singleSectionItem.image.asset._ref) {
                imageUrl += singleSectionItem.image.asset._ref;
            } else {
                imageUrl += 'no-image-found.jpg';
            }

            return (
                <Col className="image col-md-2" onClick={() => this.sectionSelcted(singleSectionItem)}>
                    <img src={imageUrl} />
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
                <div className="col-md-12 mb-20">
                    <Link to="/home">
                        <Button variant="primary">
                            Back
                        </Button>
                    </Link>
                </div>

                <Col className="wrapper col-md-12">
                    <a href="#" className="prev" onClick={this.scroll.bind(null,-1)}>&#10094;</a>
                    <div className="image-container">
                        {this.sectionSlider()}
                    </div>
                    <a href="#" className="next" onClick={this.scroll.bind(null,1)}>&#10095;</a>
                </Col>
                
                <Col style={{marginTop: "10px"}}>
                    <CardColumns>
                        {
                            this.state.selectedSectionId !== '' ?
                                this.dynamicItems() :
                                this.dynamicSections()
                        }
                    </CardColumns>
                </Col>
            </div>
        )
    }
};
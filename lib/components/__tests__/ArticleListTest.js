import React from 'react';
import ArticleList from '../ArticleList';
import Article from '../Article';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import renderer from 'react-test-renderer';

configure({adapter: new Adapter()});

const testProps = {
    articles:{
        a:{ id: 'a'},
        b:{ id: 'b'},
    },
    store:{
        lookupAuthor: jest.fn(() => ({}))
    }
};

describe('ArticleList', () =>{
    it('renders correctly', () => {
        const wrapper = shallow(
            <ArticleList 
                {...testProps}/>
        );
            console.log
        expect(wrapper.find('ArticleContainer').length).toBe(2);

        expect(wrapper).toMatchSnapshot();
    });
});
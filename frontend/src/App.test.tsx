import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { CreateUser } from './CreateUser/CreateUser';
import { create } from 'react-test-renderer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

test('renders MyFace text at least once', () => {
  const { getAllByText } = render(<App />);
  const textElement = getAllByText(/MyFace/i);
  expect(textElement[0]).toBeInTheDocument();
});

describe("My Component", () => {
    it("Test that snapshot of CreateUser component matches previous snapshot", async () => {
      const tree = create(<Router><CreateUser /></Router>).toJSON();
      expect(tree).toMatchSnapshot();
    });
});

import { describe, it, expect, vi, test } from 'vitest';
import { fireEvent, render, renderHook, act, screen } from '@testing-library/react';
import { searchTest, SearchBar } from '../SearchBar'
import { ProductContainerState } from '../ProductContainer';


// sample data for products
const data = [
   {
      "name": "Golden-Delicious",
      "class_name": "Apple",
    },
    {
      "name": "Granny-Smith",
      "class_name": "Apple",
    },
    {
      "name": "Pink-Lady",
      "class_name": "Apple",
    },
    {
      "name": "Tropicana-Apple-Juice",
      "class_name": "Juice",
    },
    {
      "name": "Tropicana-Golden-Grapefruit",
      "class_name": "Juice",
    },
    {
      "name": "Tropicana-Juice-Smooth",
      "class_name": "Juice",
    },
    {
      "name": "Alpro-Vanilla-Soyghurt",
      "class_name": "Soyghurt",
    },
]

// expected products after searches
const smith_expected = [
   data[1], // name includes 'Smith'
]
const apple_expected = [
   data[0], // of class 'Apple'
   data[1], // of class 'Apple'
   data[2], // of class 'Apple'
   data[3], // name includes 'Apple'
]
const juice_expected = [
   data[3], // of class 'Juice'
   data[4], // of class 'Juice'
   data[5], // of class 'Juice'
]

test('testing search function', () => {
   expect(searchTest('smith', data)).toStrictEqual(smith_expected)
   expect(searchTest('apple', data)).toStrictEqual(apple_expected)
   expect(searchTest('juice', data)).toStrictEqual(juice_expected)
})

describe('SearchBar', () => {   
   it('should update product state based on search', () => {
      // setup state hook
      const { result } = renderHook(() => ProductContainerState(data))

      // make Searchbar with setState (result.current[1])
      render(<SearchBar data={data} setProducts={result.current[1]} />);

      // define variables for ease of use
      const searchInput = screen.getByRole('search').children[0]
      const submitButton = screen.getByRole('search').children[1]
      const getProducts = () => result.current[0]

      // submit 'smith' in search
      act(() => {
         fireEvent.change(searchInput, { target: { value: 'smith' } });
         fireEvent.click(submitButton)
      })
      // verify 'smith' results
      expect(getProducts()).toStrictEqual(smith_expected);

      // submit 'smiappleth' in search
      act(() => {
         fireEvent.change(searchInput, { target: { value: 'apple' } });
         fireEvent.click(submitButton)
      })
      // verify 'apple' results
      expect(getProducts()).toStrictEqual(apple_expected);

      // submit 'juice' in search
      act(() => {
         fireEvent.change(searchInput, { target: { value: 'juice' } });
         fireEvent.click(submitButton)
      })
      // verify 'juice' results
      expect(getProducts()).toStrictEqual(juice_expected);
   })
})

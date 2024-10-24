import { useState } from 'react';
import { createContainer } from 'react-tracked';

export type StateProps={
  apply: number
}
const initialState: StateProps = {
  apply: 0
};

const useMyState = () => useState(initialState);

export const {
  Provider: SharedStateProvider,
  useTracked: useSharedState,
} = createContainer(useMyState);
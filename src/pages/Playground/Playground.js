import React from 'react';
import BaseInput from '../../components/BaseInput/BaseInput';
import BaseButton from '../../components/BaseButton/BaseButton';

function Playground() {
  return (
    <div>
      <BaseButton className="m-4" variant="solid">
        Test button
      </BaseButton>
      <BaseButton className="m-4" variant="white">
        Test button
      </BaseButton>
      <BaseButton className="m-4" variant="ghost">
        Test button
      </BaseButton>
      <BaseButton className="m-4" variant="black">
        Test button
      </BaseButton>
      <BaseInput
        label=""
        variant="solid"
        className="my-3"
        placeholder="input"
      />
      <BaseInput
        label=""
        variant="white"
        className="my-3"
        placeholder="input"
      />
      <BaseInput
        label=""
        variant="ghost"
        className="my-3"
        placeholder="input"
      />
      <BaseInput
        label=""
        variant="black"
        className="my-3"
        placeholder="input"
      />
    </div>
  );
}

export default Playground;

const { NewItemTagStyle } = require('../../uielements/Collection.style');

export const NewItemTag = () => {
  return (
    <NewItemTagStyle
      style={{
        borderRadius: 10,
      }}
      color="#108ee9"
    >
      new
    </NewItemTagStyle>
  );
};

export default {};

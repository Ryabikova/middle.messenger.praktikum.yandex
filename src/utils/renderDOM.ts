const render = function (query, block) {
  const root = document.querySelector(query);
  if (root.firstChild) root.firstChild.remove();
  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
};

export default render;

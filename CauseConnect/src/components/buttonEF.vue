<style scoped>
:global(.button) {
  font-family: "Zen Maru Gothic", serif;
  border-color: #f7a400;
  background: #f4f4f4;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  max-width: 240px;
  padding: 10px 25px;
  color: #f7a400;
  transition: 0.3s ease-in-out;
  font-weight: 500;
  z-index:0;
}

.button::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 0;
  display: block;
  background: #ff8c00;
  transition: 0.3s;
  left: 0;
}

.button:hover {
    color: #333;
}
.button:hover::before {
    width: 100%;
    z-index: -1;
}

</style>

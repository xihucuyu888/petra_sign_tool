import './styles.css';

const inputMessage = document.getElementById("inputMessage");
const signButton = document.getElementById("signButton");
const outputMessage = document.getElementById('outputMessage');


signButton.addEventListener('click', handleClick);

const getAptosWallet = () => {
  if ('aptos' in window) {
    return window.aptos;
  } else {
    window.open('https://petra.app/', `_blank`);
  }
};

async function handleClick() {
  
  if (typeof window.aptos !== "undefined") {
    const wallet = getAptosWallet();
    try {
      const response = await wallet.connect();
      console.log('wallet connected:',response); // { address: string, address: string }
     
      const account = await wallet.account();
      console.log('account connected:',account); // { address: string, address: string }
    } catch (error) {
      console.log('User rejected the request.')
      // { code: 4001, message: "User rejected the request."}
    }
    const message = inputMessage.value;
    const nonce = '12345';

    if (message) {
      window.aptos
        .signMessage({
          message,
          nonce
    })
        .then((response) => {
          console.log("签名结果:", response);
          outputMessage.textContent = `fullMessage：\n${response.fullMessage}\n\n签名：\n${response.signature}\n\n地址：\n${response.address}`;
        })
        .catch((error) => {
          console.error("签名失败:", error);
          alert("签名失败，请查看控制台以获取详细信息。");
        });
    } else {
      alert("请输入要签名的字符串。");
    }
  } else {
    alert("请安装Petra插件。");
  }
}

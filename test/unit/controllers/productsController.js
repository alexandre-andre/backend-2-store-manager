const sinon = require('sinon');
const { expect } = require('chai');
const ProductService = require('../../../services/productService');
const ProductController = require('../../../controllers/productController');
const { mockProducts } = require('../../mock');

describe('CONTROLLER PRODUCTS', () => {
  let response = {};
  let request = {};
  
  describe('Verifica getAllProducts', async () => {
    beforeEach(() => {
      sinon.stub(ProductService, 'getAllProducts').resolves(mockProducts) // saída da service
      response.status = sinon.stub().returns(response); // saída da model
      response.json = sinon.stub().returns(mockProducts); // saída da model
      // console.log('DESCRIBE: ', mockProducts);
    });

    afterEach(() => ProductService.getAllProducts.restore());

    it('se retorna todos os produtos', async () => {
      const product = await ProductController.getAllProducts(request, response); // recebe res como argumento
      
      expect(product).to.be.an('array').not.empty;
    });
  });

  describe('Verifica getById quando id invalido', async () => {
    beforeEach(() => {
      request.body = {};
      request.params = 99;

      sinon.stub(ProductService, 'getProductById').resolves(false); // simulan a saida do service chamado na model

      response.status = sinon.stub().returns(response); // saida do satus da model
      response.json = sinon.stub().returns('Product not found'); // saida do json da model
    });

    afterEach(() => ProductService.getProductById.restore());

    it('se é chamado o codigo 404', async() => {
      await ProductController.getById(request, response); // req e res ja populado pelo before
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('se é chamada a mensagem "Product not found"', async() => {
      await ProductController.getById(request, response); // req e res ja populado pelo before
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  });

  describe('Verifica getById quando id é válido', async () => {
    beforeEach(() => {
      request.body = {};
      request.params = 1;

      sinon.stub(ProductService, 'getProductById').resolves(true); // simulan a saida do service chamado na model

      response.status = sinon.stub().returns(response); // saida do satus da model
      response.json = sinon.stub().returns(mockProducts[0]); // saida do json da model
      // console.log('BEFORE >>> ', mockProducts[0]);
    });

    afterEach(() => ProductService.getProductById.restore());

    it('se é chamado o codigo 200', async() => {
      await ProductController.getById(request, response); // req e res ja populado pelo before
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    // it('se é retorna um produto', async() => {
    //   await ProductController.getById(request, response); // req e res ja populado pelo before
    //   // console.log('IT >>> ', mockProducts[0])
    //   expect(response.json.calledWith(mockProducts[0])).to.be.equal(true);
    // });
  });

  describe('Verifica createProd quando da ruim', async () => {
    beforeEach(() => {
      request.body = {};

      sinon.stub(ProductService, 'postProductdByName').resolves(false);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns({ message: 'Product already exists'});
    });

    afterEach(() => ProductService.postProductdByName.restore());

    it('quando um produto ja existe', async() => {
      await ProductController.createProd(request, response);
      expect(response.status.calledWith(409)).to.be.equals(true);
      expect(response.json.calledWith({ message: 'Product already exists' })).to.be.equal(true);
    });
  });

  describe('Verifica createProd quando OK', async () => {
    beforeEach(() => {
      request.body = { name: 'smeagol', quantity: 1 };
      
      sinon.stub(ProductService, 'postProductdByName').resolves(true);


      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns({ ...request.body, id: 9 });
    });

    afterEach(() => ProductService.postProductdByName.restore());

    it('se retorna o status 201', async() => {
      await ProductController.createProd(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    // it('se retorna o produto criado', async() => {
    //   await ProductController.createProd(request, response);

    //   expect(response.json.calledWith({ ...request.body, id: 9 })).to.be.equal(true);
    // });
  });

  describe('Verifica putProduct quando NAO OK', async () => {
    beforeEach(() => {
      request.params = 99;

      sinon.stub(ProductService, 'getProductById').resolves(false);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns('Product not found');
    });

    afterEach(() => ProductService.getProductById.restore());

    it('se retorna o status 404', async() => {
      await ProductController.putProduct(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('se retorna o produto criado', async() => {
      await ProductController.putProduct(request, response);

      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  });

  describe('Verifica putProduct quando OK', async () => {
    beforeEach(() => {
      request.params = 9;
      request.body = { name: 'Legolas', quantity: 1 };
      
      sinon.stub(ProductService, 'getProductById').resolves(true);
      sinon.stub(ProductService, 'putProduct').resolves(true);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns({ id: 9, name: 'Legolas', quantity: 1 });
    });

    afterEach(() => {
      ProductService.getProductById.restore(); 
      ProductService.putProduct.restore();
    });

    it('se retorna o status 200 quando editado', async() => {
      await ProductController.putProduct(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    // it('se retorna o produto editado', async() => {
    //   await ProductController.putProduct(request, response);

    //   expect(response.json.calledWith({ id: 9, name: 'Legolas', quantity: 1 })).to.be.equal(true);
    // });
  });

  // describe('Verifica deleteProduct quando NAO OK', async () => {
  //   beforeEach(() => {
  //     request.params = 99;
      
  //     sinon.stub(ProductService, 'getProductById').resolves(false);

  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns({ message: 'Product not found' });
  //   });

  //   afterEach(() => ProductService.getProductById.restore());

  //   it('se retorna o status 404', async() => {
  //     await ProductController.deleteProduct(request, response);

  //     expect(response.status.calledWith(404)).to.be.equal(true);
  //   });

  //   // it('se retorna a mensagem de nao encontrado', async() => {
  //   //   await ProductController.deleteProduct(request, response);

  //   //   expect(response.status.calledWith({ message: 'Product not found' })).to.be.equal(true);
  //   // });
  // });

  // describe('Verifica deleteProduct quando OK', async () => {
  //   beforeEach(() => {
  //     request.params = 1;
      
  //     sinon.stub(ProductService, 'getProductById').resolves(true);
  //     sinon.stub(ProductService, 'deleteProductById').resolves(true);

  //     response.status = sinon.stub().returns(response);
  //   });

  //   afterEach(() => {
  //     ProductService.getProductById.restore();
  //     ProductService.deleteProductById.restore();
  //   });

  //   it('se retorna o status 204', async() => {
  //     await ProductController.deleteProduct(request, response);

  //     expect(response.status.calledWith(204)).to.be.equal(true);
  //   });
  // });
});
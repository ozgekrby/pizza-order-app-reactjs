describe("Pizza Sipariş Formu Testi", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Formu başarıyla doldurmalı,gönderme işlemi yapmalı ve API POST işlemi başarılı olmalı", () => {
    cy.get('[data-cy="radio-orta"]').check();
    cy.get('[data-cy="radio-orta"]').should("be.checked");
    cy.get('[data-cy="crust-thickness"]').select("normal");
    cy.get('[data-cy="crust-thickness"]').should("have.value", "normal");
    cy.get('[data-cy="checkbox-Pepperoni"]').check().should("be.checked");
    cy.get('[data-cy="checkbox-Sosis"]').check().should("be.checked");
    cy.get('[data-cy="checkbox-Domates"]').check().should("be.checked");
    cy.get('[data-cy="checkbox-Sucuk"]').check().should("be.checked");
    cy.get('[data-cy="isim"]')
      .type("Özge Karabay")
      .should("have.value", "Özge Karabay");
    cy.get('[data-cy="order-note"]')
      .type("Ekstra sos rica ederim.")
      .should("have.value", "Ekstra sos rica ederim.");
    cy.get('[data-cy="item-count"]').should("contain", "1");
    cy.get('[data-cy="increment-button"]').click();
    cy.get('[data-cy="item-count"]').should("contain", "2");
    cy.get('[data-cy="decrement-button"]').click();
    cy.get('[data-cy="item-count"]').should("contain", "1");
    cy.get('[data-cy="submit-button"]').click();
    cy.url().should("include", "/Success");
    cy.intercept("POST", "https://reqres.in/api/pizza").as("postPizza");
    cy.wait("@postPizza").its("response.statusCode").should("eq", 201);
  });
  it("Radio buttonlardan biri seçildiğinde diğerleri check olmamalı", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="radio-orta"]').check();
    cy.get('[data-cy="radio-orta"]').should("be.checked");
    cy.get('[data-cy="radio-küçük"]').should("not.be.checked");
    cy.get('[data-cy="radio-büyük"]').should("not.be.checked");
    cy.get('[data-cy="radio-büyük"]').check();
    cy.get('[data-cy="radio-orta"]').should("not.be.checked");
    cy.get('[data-cy="radio-küçük"]').check();
    cy.get('[data-cy="radio-orta"]').should("not.be.checked");
    cy.get('[data-cy="radio-büyük"]').should("not.be.checked");
  });
  it("Radio button seçilmediğinde submit butonu disabled olmalı", () => {
    cy.get('[data-cy="crust-thickness"]').select("normal");
    cy.get('[data-cy="checkbox-Pepperoni"]').check()
    cy.get('[data-cy="checkbox-Sosis"]').check()
    cy.get('[data-cy="checkbox-Domates"]').check()
    cy.get('[data-cy="checkbox-Sucuk"]').check()
    cy.get('[data-cy="isim"]')
      .type("Özge Karabay")
    cy.get('[data-cy="order-note"]')
      .type("Ekstra sos rica ederim.")
    cy.get('[data-cy="increment-button"]').click();
    cy.get('[data-cy="submit-button"]').should("be.disabled");
  });
  it("Hamur kalınlığı seçilmediğinde submit butonu disabled olmalı", () => {
    cy.get('[data-cy="radio-orta"]').check();
    cy.get('[data-cy="checkbox-Pepperoni"]').check()
    cy.get('[data-cy="checkbox-Sosis"]').check()
    cy.get('[data-cy="checkbox-Domates"]').check()
    cy.get('[data-cy="checkbox-Sucuk"]').check()
    cy.get('[data-cy="isim"]')
      .type("Özge Karabay")
    cy.get('[data-cy="order-note"]')
      .type("Ekstra sos rica ederim.")
    cy.get('[data-cy="increment-button"]').click();
    cy.get('[data-cy="submit-button"]').should("be.disabled");
  });
  it("Hamur kalınlığı seçilip sonra tekrar seçim iptal edilince hata mesajı almalı", () => {
    cy.get('[data-cy="crust-thickness"]').select("normal");
    cy.get('[data-cy="crust-thickness"]').select("Hamur Kalınlığı");
    cy.get('[data-cy="error-crust"]').should('be.visible');
    cy.get('[data-cy="error-crust"]').should('contain.text', "Lütfen hamur kalınlığını seçin");
  });
  it("4 adet ekstra malzeme seçilmediğinde submit butonu disabled olmalı ve hata mesajı yazmalı", () => {
    cy.get('[data-cy="radio-orta"]').check();
    cy.get('[data-cy="crust-thickness"]').select("normal");
    cy.get('[data-cy="checkbox-Pepperoni"]').check()
    cy.get('[data-cy="checkbox-Sosis"]').check()
    cy.get('[data-cy="checkbox-Domates"]').check()
    cy.get('[data-cy="isim"]')
      .type("Özge Karabay")
    cy.get('[data-cy="order-note"]')
      .type("Ekstra sos rica ederim.")
    cy.get('[data-cy="increment-button"]').click();
    cy.get('[data-cy="submit-button"]').should("be.disabled");
    cy.get('[data-cy="error-extra"]').should('be.visible');
    cy.get('[data-cy="error-extra"]').should('contain.text', "Lütfen en az 4 adet extra malzeme seçin");
  });
  it("10 adet ekstra malzeme seçildiğinde diğer checkboxlar tıklanamaz olmalı ve uyarı mesajı almalı", () => {
    cy.get('[data-cy="checkbox-Pepperoni"]').check();
    cy.get('[data-cy="checkbox-Sosis"]').check();
    cy.get('[data-cy="checkbox-Soğan"]').check();
    cy.get('[data-cy="checkbox-Mısır"]').check();
    cy.get('[data-cy="checkbox-Sarımsak"]').check();
    cy.get('[data-cy="checkbox-Kabak"]').check();
    cy.get('[data-cy="checkbox-Biber"]').check();
    cy.get('[data-cy="checkbox-Ananas"]').check();
    cy.get('[data-cy="checkbox-Jalapeno"]').check();
    cy.get('[data-cy="checkbox-Domates"]').check();
    cy.get('[data-cy="checkbox-Sucuk"]').should("be.disabled");
    cy.get('[data-cy="checkbox-Tavuk Izgara"]').should("be.disabled");
    cy.get('[data-cy="checkbox-Kanada Jambonu"]').should("be.disabled");
    cy.get('[data-cy="error-extra"]').should('be.visible');
    cy.get('[data-cy="error-extra"]').should('contain.text', "En fazla 10 adet malzeme seçebilirsiniz.");
  });
  
  it("İsim yazılmadığında submit butonu disabled olmalı", () => {
    cy.get('[data-cy="radio-orta"]').check();
    cy.get('[data-cy="crust-thickness"]').select("normal");
    cy.get('[data-cy="checkbox-Pepperoni"]').check()
    cy.get('[data-cy="checkbox-Sosis"]').check()
    cy.get('[data-cy="checkbox-Domates"]').check()
    cy.get('[data-cy="checkbox-Sucuk"]').check()
    cy.get('[data-cy="order-note"]')
      .type("Ekstra sos rica ederim.")
    cy.get('[data-cy="increment-button"]').click();
    cy.get('[data-cy="submit-button"]').should("be.disabled");
  });
  it("İsim yanlış yazıldığında uyarı mesajı almalı", () => {
    cy.get('[data-cy="isim"]')
      .type("Özge ")
      cy.get('[data-cy="error-name"]').should('be.visible');
    cy.get('[data-cy="error-name"]').should('contain.text', "Lütfen adınızı soyadınızı giriniz");
  });
});

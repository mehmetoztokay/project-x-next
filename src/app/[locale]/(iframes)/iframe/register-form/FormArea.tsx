"use client";
import React, { useState } from "react";
import { RegisterForm } from "@/containers/ContainerHomePage/RegisterForm";
import { Modal } from "@/components/Atoms/Modal";

export const FormArea = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModal2, setIsOpenModal2] = useState<boolean>(false);

  return (
    <>
      {/* {t("title")} */}
      <RegisterForm />
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
        <div className="flex max-w-[500px] items-center rounded bg-white p-4 pt-14">
          <div className="">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ex
              et dolorem saepe necessitatibus harum minima non magnam qui eius
              cum, laudantium aliquam! Adipisci libero omnis dolor delectus
              numquam reiciendis?
            </p>
            <button
              onClick={() => setIsOpenModal2(true)}
              className="rounded bg-blue-400 px-4 py-4"
            >
              Open modal
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpenModal={isOpenModal2}
        setIsOpenModal={setIsOpenModal2}
        hasCancelAbortAlert
      >
        <div className="flex max-w-[500px] items-center rounded bg-white p-4 pt-14">
          <div className="">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
              qui eaque ducimus voluptate magnam voluptates animi ea incidunt.
              Omnis asperiores possimus perspiciatis rem molestiae quaerat qui
              aperiam placeat tempora reiciendis fugit, sequi perferendis, illo
              tempore eos quam culpa nemo ex eaque provident quis assumenda
              incidunt consequuntur ipsam! Beatae similique totam libero ex,
              earum laboriosam vitae sapiente cum deleniti! Incidunt quam
              doloremque sapiente amet delectus, cupiditate porro modi animi
              nisi ipsa quod, repudiandae nostrum vitae pariatur quos!
              Repudiandae at corrupti assumenda ut, blanditiis praesentium nisi
              fuga itaque nostrum maxime voluptatibus aut dolores inventore
              dolorum tempora! Deleniti fuga vel minima quasi necessitatibus?
              Rerum ad nesciunt in ducimus incidunt illo dolores harum nulla est
              itaque atque placeat quod et mollitia, saepe hic quidem. Natus
              esse consequuntur nam ipsum veritatis pariatur, iste velit
              corporis obcaecati rem hic quod eos est aliquid dolore placeat
              nobis. Ex amet nesciunt a, repellat magni vero architecto dolorem,
              quam itaque deserunt tenetur similique quaerat natus perspiciatis
              repudiandae, assumenda adipisci optio aspernatur iure ut alias
              nemo. Esse, adipisci! A id ipsum, rem esse consectetur veniam
              ipsa. Eligendi voluptate officia earum, expedita iusto id
              dignissimos explicabo nesciunt consequatur, iste debitis dolorem
              repellendus sunt facere, cumque aspernatur laborum alias adipisci
              totam corporis? Necessitatibus magnam quae accusamus voluptatum
              culpa sunt quas explicabo ratione nisi quo illum inventore,
              numquam, aliquid excepturi repudiandae consequuntur perspiciatis
              eius autem. Fuga nisi aliquid aperiam nobis molestiae hic
              cupiditate error, quibusdam fugit doloremque? Tempore est sed
              beatae at necessitatibus voluptas ullam itaque, provident
              consequatur commodi exercitationem eius vero quibusdam laudantium
              iure nobis numquam a ad repellat rerum quam et vel dicta? Velit
              ipsam incidunt optio aut. Quasi dignissimos ducimus enim natus in
              officiis porro nihil quae! Repellendus deleniti perspiciatis totam
              quaerat aspernatur veniam ratione ducimus odio aliquam, vitae
              accusantium voluptatibus facere enim cupiditate doloribus. Cumque,
              nam deleniti? Vel magni dicta odit impedit voluptatibus nemo eum,
              minus fugiat voluptas corrupti. Distinctio in quaerat nulla
              corporis? Culpa deserunt ratione maiores possimus, fugit, impedit
              minima ea voluptatum vitae, accusantium neque corporis nulla
              voluptatibus! Exercitationem eveniet consequuntur beatae odit nam
              earum obcaecati unde voluptatum, voluptas deserunt est
              consectetur. Doloribus, provident dicta. Asperiores, iusto minima
              quidem vitae dolorum cum ratione reprehenderit eveniet dicta,
              mollitia perferendis. Earum, similique voluptas nemo deserunt
              perferendis dolorum maxime soluta molestias, labore atque debitis
              quaerat quam nulla eveniet voluptatum! Natus eligendi, sequi nobis
              consectetur ex at iste commodi ut esse facilis id necessitatibus
              dolorem perferendis vitae magnam optio. Sint laudantium pariatur
              quos! Molestias, error adipisci repellat et officia omnis cumque
              iure dolorem laudantium saepe, enim deserunt quod perferendis
              eligendi voluptatem minus vitae vel veniam sunt accusamus
              repellendus quos, iste ex! Harum ad earum ab ut pariatur non
              delectus eum alias autem fuga veritatis tempore nam, quod
              obcaecati laborum architecto numquam sit omnis? Libero omnis iure
              eius at, sapiente repellat explicabo ex quis vero doloremque
              deserunt, earum hic expedita quasi velit! Voluptatem, nesciunt
              eligendi enim dolore quidem numquam dolor possimus saepe qui sint?
              Culpa delectus facilis dolor, aperiam quas explicabo cum! Vitae
              quaerat repudiandae repellendus, sapiente deleniti assumenda sequi
              inventore nobis doloribus et culpa voluptatum dignissimos magnam
              blanditiis. Dolore iste cupiditate quidem doloremque accusantium
              aspernatur! Minima a inventore non ipsum id, aperiam tempora
              adipisci magni reiciendis sunt doloremque, aliquam numquam.
              Perspiciatis dicta modi adipisci. Neque id quibusdam est
              molestias, veritatis possimus facilis, aspernatur aperiam optio
              blanditiis eaque tempore debitis, accusantium eum autem sapiente
              dolorum eveniet corporis. Reiciendis soluta eligendi ratione
              tempore natus adipisci aspernatur! Nostrum repellat aperiam eos,
              reiciendis suscipit nam doloribus, cupiditate in dignissimos
              consectetur quibusdam est. Autem quam totam ducimus obcaecati,
              animi odio quibusdam repellat quisquam vero, esse atque maxime
              quidem corrupti tempore nihil. Autem iste harum error nulla
              laudantium nobis, provident velit iusto voluptatibus soluta
              accusantium atque asperiores incidunt fuga quos! Animi autem
              officiis, repellat itaque nisi unde voluptate consectetur
              reiciendis consequuntur rem deleniti obcaecati quis et illo, nam,
              quod totam iste. Quaerat nostrum iste pariatur a optio commodi
              perspiciatis corporis, quas architecto porro, beatae molestias
              inventore accusamus id minus possimus autem consequatur rem?
              Architecto dolorem, esse cum molestias delectus et doloremque
              possimus iste quibusdam molestiae adipisci rem ipsum nisi.
              Mollitia odio nam repudiandae praesentium quidem harum, inventore
              natus magnam voluptas cum, ut consectetur ab temporibus culpa.
              Incidunt error, vel molestias est expedita consectetur nisi
              possimus deserunt mollitia quia perferendis unde ab soluta magnam
              non delectus sapiente veritatis qui illo quis maxime! Impedit illo
              sequi ea excepturi fugiat quaerat unde dolores illum incidunt.
              Cumque commodi dolore suscipit et necessitatibus mollitia fuga id,
              illum sint rerum autem quidem facere aperiam, quisquam molestiae
              iure vel quam veniam? Et iure reprehenderit totam, voluptas quia
              delectus recusandae beatae nisi maxime officia voluptatibus
              obcaecati voluptate a qui odit amet numquam eveniet cupiditate
              aspernatur nobis aliquid vero reiciendis? Reiciendis eaque fugiat
              repellendus quod odit aut repellat tenetur asperiores dolore
              necessitatibus consectetur ut eligendi omnis illum rem eos neque
              quibusdam fuga error, earum dolor quia, corporis id! Tempora
              consequatur dolorem assumenda, ab ipsa deserunt tempore, nemo
              exercitationem blanditiis hic aliquid possimus quae non officiis
              inventore veritatis itaque aperiam incidunt placeat porro
              molestiae at magni. Nostrum consectetur, quas qui similique porro,
              modi ipsam natus distinctio, placeat omnis quidem? Quia unde
              necessitatibus itaque adipisci quasi magnam nulla sit! Aspernatur
              tempore, quasi sint cumque et quia aperiam enim voluptatem
              deleniti corrupti nisi vitae consectetur accusamus repellat modi
              laborum. Distinctio fugiat consequuntur eius velit sequi harum non
              quas odit illo quaerat? Laudantium accusamus, laboriosam ipsam
              possimus nulla culpa vero. Cupiditate unde, eaque aliquam quia
              ipsam impedit id dolores delectus ducimus, sit minus. Molestias
              vero, labore quia saepe ipsam voluptatem laudantium modi illum?
              Beatae commodi, libero nobis minus tenetur soluta a necessitatibus
              doloremque accusantium numquam blanditiis eum quod labore nulla
              fugit error animi nemo molestiae? Suscipit est obcaecati modi,
              impedit corporis possimus eius alias dolorem itaque! Hic natus
              amet, tempora ex numquam, vero temporibus quam accusamus ipsam
              veritatis officia dolorem, sunt dolorum obcaecati ipsum rerum
              iusto! Ea dolorem animi nobis, libero corrupti iste error beatae
              reprehenderit aliquam officiis numquam quibusdam? Sequi esse
              suscipit eveniet blanditiis quisquam sed voluptatum cumque. Ut
              tenetur unde ea quod error repellat dignissimos magni! Nihil, rem!
            </p>
            <button
              onClick={() => setIsOpenModal2(true)}
              className="rounded bg-blue-400 px-4 py-4"
            >
              Open modal
            </button>
          </div>
        </div>
      </Modal>
      <div className="my-4 flex items-center justify-center">
        <button
          className="mx-auto rounded bg-blue-400 px-4 py-4"
          onClick={() => setIsOpenModal(true)}
        >
          Open modal 1
        </button>
      </div>
    </>
  );
};
